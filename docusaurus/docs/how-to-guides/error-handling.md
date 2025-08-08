# How to Handle Parsing Errors Gracefully

**Implement robust error handling for production applications**

When working with ATT&CK data in production, you need comprehensive error handling to manage data source failures, validation errors, and parsing issues. This guide shows you how to build resilient applications that handle errors gracefully while providing meaningful feedback.

## Problem

You need to handle various error scenarios:

- Network failures when loading remote data sources
- Invalid STIX data that fails validation
- Missing or corrupted data files
- Partial parsing failures in relaxed mode
- Timeout issues with large datasets

## Solution Overview

Implement layered error handling with specific strategies for different error types, comprehensive logging, and graceful degradation.

## Step 1: Understanding Error Types

The ATT&CK Data Model can throw several types of errors:

```typescript
import {
    registerDataSource,
    loadDataModel,
    DataSource,
    DataSourceError,
    ValidationError
} from '@mitre-attack/attack-data-model';
import { ZodError } from 'zod';

// Error types you'll encounter:
// 1. Network/IO errors - failed downloads, missing files
// 2. Zod validation errors - schema validation failures
// 3. Data source errors - configuration issues
// 4. Parsing errors - malformed JSON, invalid STIX
// 5. Registration errors - data source registration failures
```

## Step 2: Basic Error Handling Pattern

Create a robust data loading function:

```typescript
import fs from 'fs';
import { setTimeout } from 'timers/promises';

interface LoadResult {
    success: boolean;
    dataModel?: AttackDataModel;
    errors: string[];
    warnings: string[];
}

async function loadAttackDataSafely(
    source: 'attack' | 'file' | 'url',
    options: any
): Promise<LoadResult> {
    const result: LoadResult = {
        success: false,
        errors: [],
        warnings: []
    };

    try {
        // Step 1: Create data source with validation
        console.log(`📡 Loading ATT&CK data from ${source}...`);

        const dataSource = new DataSource({
            source,
            parsingMode: 'relaxed', // More forgiving for error scenarios
            ...options
        });

        // Step 2: Register with timeout
        const uuid = await Promise.race([
            registerDataSource(dataSource),
            setTimeout(30000).then(() => {
                throw new Error('Registration timeout after 30 seconds');
            })
        ]);

        if (!uuid) {
            result.errors.push('Failed to register data source - no UUID returned');
            return result;
        }

        console.log('✅ Data source registered successfully');

        // Step 3: Load data model
        const dataModel = loadDataModel(uuid);

        // Step 4: Validate data completeness
        const validation = validateDataCompleteness(dataModel);
        result.warnings.push(...validation.warnings);

        if (validation.criticalIssues.length > 0) {
            result.errors.push(...validation.criticalIssues);
            return result;
        }

        result.success = true;
        result.dataModel = dataModel;

        console.log(`✅ Successfully loaded ${dataModel.techniques.length} techniques`);

    } catch (error) {
        result.errors.push(handleLoadingError(error));
    }

    return result;
}

function handleLoadingError(error: unknown): string {
    if (error instanceof ZodError) {
        return `Validation error: ${error.errors.map(e =>
            `${e.path.join('.')}: ${e.message}`
        ).join(', ')}`;
    }

    if (error instanceof Error) {
        // Network/timeout errors
        if (error.message.includes('timeout')) {
            return 'Request timeout - data source may be slow or unavailable';
        }

        // File system errors
        if (error.message.includes('ENOENT')) {
            return 'File not found - check file path and permissions';
        }

        // Network errors
        if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
            return 'Network error - check internet connection and URL';
        }

        return `Error: ${error.message}`;
    }

    return `Unknown error: ${String(error)}`;
}
```

## Step 3: Data Completeness Validation

Validate that loaded data meets minimum requirements:

```typescript
interface DataValidation {
    warnings: string[];
    criticalIssues: string[];
    stats: {
        techniques: number;
        tactics: number;
        groups: number;
        software: number;
    };
}

function validateDataCompleteness(dataModel: AttackDataModel): DataValidation {
    const result: DataValidation = {
        warnings: [],
        criticalIssues: [],
        stats: {
            techniques: dataModel.techniques.length,
            tactics: dataModel.tactics.length,
            groups: dataModel.groups.length,
            software: dataModel.malware.length + dataModel.tools.length
        }
    };

    // Critical issues - data is unusable
    if (result.stats.techniques === 0) {
        result.criticalIssues.push('No techniques loaded - data source may be invalid');
    }

    if (result.stats.tactics === 0) {
        result.criticalIssues.push('No tactics loaded - core ATT&CK structure missing');
    }

    // Warnings - data is usable but incomplete
    if (result.stats.techniques < 100) {
        result.warnings.push(`Only ${result.stats.techniques} techniques loaded - expected 150+`);
    }

    if (result.stats.groups < 50) {
        result.warnings.push(`Only ${result.stats.groups} groups loaded - expected 100+`);
    }

    if (result.stats.software < 200) {
        result.warnings.push(`Only ${result.stats.software} software items loaded - expected 400+`);
    }

    // Check relationship integrity
    const brokenRelationships = checkRelationshipIntegrity(dataModel);
    if (brokenRelationships.length > 0) {
        result.warnings.push(`${brokenRelationships.length} broken relationships found`);
    }

    return result;
}

function checkRelationshipIntegrity(dataModel: AttackDataModel): string[] {
    const issues: string[] = [];

    // Check technique-tactic relationships
    dataModel.techniques.forEach(technique => {
        try {
            const tactics = technique.getTactics();
            if (tactics.length === 0) {
                issues.push(`Technique ${technique.name} has no associated tactics`);
            }
        } catch (error) {
            issues.push(`Error getting tactics for technique ${technique.name}: ${error}`);
        }
    });

    return issues.slice(0, 10); // Limit to first 10 issues
}
```

## Step 4: Retry Logic with Exponential Backoff

Implement retry logic for transient failures:

```typescript
interface RetryOptions {
    maxAttempts: number;
    baseDelay: number;
    maxDelay: number;
    backoffMultiplier: number;
}

async function loadWithRetry(
    loadFunction: () => Promise<LoadResult>,
    options: RetryOptions = {
        maxAttempts: 3,
        baseDelay: 1000,
        maxDelay: 10000,
        backoffMultiplier: 2
    }
): Promise<LoadResult> {
    let lastResult: LoadResult | null = null;

    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
        console.log(`📡 Attempt ${attempt}/${options.maxAttempts}`);

        try {
            const result = await loadFunction();

            if (result.success) {
                if (attempt > 1) {
                    console.log(`✅ Succeeded on attempt ${attempt}`);
                }
                return result;
            }

            lastResult = result;

            // Don't retry for certain error types
            const nonRetryableErrors = [
                'File not found',
                'Validation error',
                'Invalid configuration'
            ];

            const hasNonRetryableError = result.errors.some(error =>
                nonRetryableErrors.some(pattern => error.includes(pattern))
            );

            if (hasNonRetryableError) {
                console.log('❌ Non-retryable error detected, aborting retries');
                break;
            }

        } catch (error) {
            lastResult = {
                success: false,
                errors: [`Attempt ${attempt} failed: ${error}`],
                warnings: []
            };
        }

        // Calculate delay with exponential backoff
        if (attempt < options.maxAttempts) {
            const delay = Math.min(
                options.baseDelay * Math.pow(options.backoffMultiplier, attempt - 1),
                options.maxDelay
            );

            console.log(`⏳ Waiting ${delay}ms before retry...`);
            await setTimeout(delay);
        }
    }

    console.log(`❌ All ${options.maxAttempts} attempts failed`);
    return lastResult || {
        success: false,
        errors: ['All retry attempts failed'],
        warnings: []
    };
}
```

## Step 5: Fallback Data Sources

Implement fallback strategies when primary sources fail:

```typescript
interface DataSourceConfig {
    primary: DataSource;
    fallbacks: DataSource[];
    cacheOptions?: {
        enabled: boolean;
        ttl: number; // Time to live in seconds
        path: string;
    };
}

class RobustAttackLoader {
    private cache = new Map<string, { data: AttackDataModel; timestamp: number }>();

    async loadWithFallbacks(config: DataSourceConfig): Promise<LoadResult> {
        const sources = [config.primary, ...config.fallbacks];
        let lastResult: LoadResult | null = null;

        // Try cache first if enabled
        if (config.cacheOptions?.enabled) {
            const cached = this.tryLoadFromCache(config.cacheOptions.path, config.cacheOptions.ttl);
            if (cached.success) {
                console.log('✅ Loaded data from cache');
                return cached;
            }
        }

        // Try each data source
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            const isLastSource = i === sources.length - 1;

            console.log(`🎯 Trying data source ${i + 1}/${sources.length}`);

            const result = await loadWithRetry(async () => {
                return await loadAttackDataSafely(
                    source.source as any,
                    source
                );
            });

            if (result.success && result.dataModel) {
                console.log(`✅ Successfully loaded from data source ${i + 1}`);

                // Cache successful result
                if (config.cacheOptions?.enabled) {
                    await this.saveToCache(result.dataModel, config.cacheOptions.path);
                }

                return result;
            }

            lastResult = result;

            if (!isLastSource) {
                console.log(`❌ Data source ${i + 1} failed, trying next...`);
            }
        }

        console.log('❌ All data sources failed');
        return lastResult || {
            success: false,
            errors: ['All data sources failed'],
            warnings: []
        };
    }

    private tryLoadFromCache(cachePath: string, ttl: number): LoadResult {
        try {
            if (!fs.existsSync(cachePath)) {
                return { success: false, errors: ['Cache file not found'], warnings: [] };
            }

            const stats = fs.statSync(cachePath);
            const age = (Date.now() - stats.mtime.getTime()) / 1000;

            if (age > ttl) {
                return { success: false, errors: ['Cache expired'], warnings: [] };
            }

            const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

            // Reconstruct AttackDataModel from cached data
            // (This would need custom deserialization logic)

            return {
                success: true,
                errors: [],
                warnings: [`Using cached data (${Math.round(age)}s old)`]
            };

        } catch (error) {
            return {
                success: false,
                errors: [`Cache load failed: ${error}`],
                warnings: []
            };
        }
    }

    private async saveToCache(dataModel: AttackDataModel, cachePath: string): Promise<void> {
        try {
            // Create cache directory if it doesn't exist
            const cacheDir = path.dirname(cachePath);
            if (!fs.existsSync(cacheDir)) {
                fs.mkdirSync(cacheDir, { recursive: true });
            }

            // Serialize data model
            const cacheData = {
                timestamp: Date.now(),
                techniques: dataModel.techniques,
                tactics: dataModel.tactics,
                groups: dataModel.groups,
                // ... other collections
            };

            fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
            console.log(`💾 Data cached to ${cachePath}`);

        } catch (error) {
            console.warn(`⚠️  Failed to save cache: ${error}`);
        }
    }
}
```

## Step 6: Error Reporting and Monitoring

Implement comprehensive error reporting:

```typescript
interface ErrorReport {
    timestamp: string;
    source: string;
    errorType: string;
    message: string;
    context: any;
    stackTrace?: string;
}

class ErrorReporter {
    private errors: ErrorReport[] = [];

    reportError(source: string, error: unknown, context: any = {}): void {
        const report: ErrorReport = {
            timestamp: new Date().toISOString(),
            source,
            errorType: error instanceof Error ? error.constructor.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            context,
            stackTrace: error instanceof Error ? error.stack : undefined
        };

        this.errors.push(report);

        // Log to console
        console.error(`❌ [${source}] ${report.message}`, report.context);

        // Send to monitoring service (implement based on your needs)
        this.sendToMonitoring(report);
    }

    private sendToMonitoring(report: ErrorReport): void {
        // Example: Send to external monitoring service
        // fetch('/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(report)
        // });
    }

    getErrorSummary(): { [key: string]: number } {
        const summary: { [key: string]: number } = {};

        this.errors.forEach(error => {
            summary[error.errorType] = (summary[error.errorType] || 0) + 1;
        });

        return summary;
    }

    getRecentErrors(hours: number = 24): ErrorReport[] {
        const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
        return this.errors.filter(error => new Date(error.timestamp) > cutoff);
    }
}

// Global error reporter instance
const errorReporter = new ErrorReporter();
```

## Step 7: Application-Level Error Handling

Create a complete error handling solution:

```typescript
interface AppConfig {
    dataSources: DataSourceConfig;
    errorHandling: {
        maxRetries: number;
        enableCache: boolean;
        cacheTtl: number;
        failFast: boolean;
    };
    monitoring: {
        enabled: boolean;
        endpoint?: string;
    };
}

class AttackDataApp {
    private config: AppConfig;
    private loader: RobustAttackLoader;
    private dataModel?: AttackDataModel;

    constructor(config: AppConfig) {
        this.config = config;
        this.loader = new RobustAttackLoader();
    }

    async initialize(): Promise<void> {
        try {
            console.log('🚀 Initializing ATT&CK Data Application...');

            const result = await this.loader.loadWithFallbacks(this.config.dataSources);

            if (!result.success) {
                const errorMsg = `Failed to initialize: ${result.errors.join(', ')}`;
                errorReporter.reportError('App.initialize', new Error(errorMsg));

                if (this.config.errorHandling.failFast) {
                    throw new Error(errorMsg);
                }

                console.warn('⚠️  Running with degraded functionality');
                return;
            }

            this.dataModel = result.dataModel;

            // Report warnings but continue
            if (result.warnings.length > 0) {
                result.warnings.forEach(warning => {
                    console.warn(`⚠️  ${warning}`);
                });
            }

            console.log('✅ Application initialized successfully');

        } catch (error) {
            errorReporter.reportError('App.initialize', error);
            throw error;
        }
    }

    // Safe method calls with error handling
    async getTechnique(id: string): Promise<TechniqueImpl | null> {
        try {
            if (!this.dataModel) {
                throw new Error('Application not initialized');
            }

            const technique = this.dataModel.techniques.find(t =>
                t.external_references[0].external_id === id
            );

            return technique || null;

        } catch (error) {
            errorReporter.reportError('App.getTechnique', error, { id });
            return null;
        }
    }

    // Health check for monitoring
    getHealthStatus(): {
        status: 'healthy' | 'degraded' | 'unhealthy';
        details: any;
    } {
        const recentErrors = errorReporter.getRecentErrors(1);
        const errorCount = recentErrors.length;

        if (!this.dataModel) {
            return {
                status: 'unhealthy',
                details: {
                    message: 'Data model not loaded',
                    errors: errorCount
                }
            };
        }

        if (errorCount > 10) {
            return {
                status: 'degraded',
                details: {
                    message: `High error rate: ${errorCount} errors in last hour`,
                    techniques: this.dataModel.techniques.length
                }
            };
        }

        return {
            status: 'healthy',
            details: {
                techniques: this.dataModel.techniques.length,
                tactics: this.dataModel.tactics.length,
                uptime: process.uptime()
            }
        };
    }
}
```

## Step 8: Usage Example

Put it all together in a production-ready application:

```typescript
async function main() {
    const config: AppConfig = {
        dataSources: {
            primary: new DataSource({
                source: 'attack',
                domain: 'enterprise-attack',
                version: '15.1',
                parsingMode: 'strict'
            }),
            fallbacks: [
                new DataSource({
                    source: 'attack',
                    domain: 'enterprise-attack',
                    parsingMode: 'relaxed' // More forgiving fallback
                }),
                new DataSource({
                    source: 'file',
                    file: './backup/enterprise-attack.json',
                    parsingMode: 'relaxed'
                })
            ],
            cacheOptions: {
                enabled: true,
                ttl: 3600, // 1 hour
                path: './cache/attack-data.json'
            }
        },
        errorHandling: {
            maxRetries: 3,
            enableCache: true,
            cacheTtl: 3600,
            failFast: false
        },
        monitoring: {
            enabled: true
        }
    };

    const app = new AttackDataApp(config);

    try {
        await app.initialize();

        // Your application logic here
        const technique = await app.getTechnique('T1055');
        if (technique) {
            console.log(`Found technique: ${technique.name}`);
        }

        // Monitor health
        setInterval(() => {
            const health = app.getHealthStatus();
            console.log(`Health: ${health.status}`, health.details);
        }, 60000); // Check every minute

    } catch (error) {
        console.error('❌ Application failed to start:', error);
        process.exit(1);
    }
}

main().catch(console.error);
```

---

## Next Steps

- **Bundle Validation**: Learn how to [validate custom STIX bundles](./validate-bundles) before processing
- **Schema Extension**: See how to [extend schemas with custom fields](./extend-schemas) for enhanced error detection
- **Reference**: Check the [complete API documentation](../reference/) for error handling methods

Your application now handles errors gracefully and provides reliable ATT&CK data access even in challenging environments!
