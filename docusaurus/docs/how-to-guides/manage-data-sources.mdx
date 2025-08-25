import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# How to Manage Data Sources

<WorkInProgressNotice />

**Switch between different ATT&CK data sources efficiently**

This guide shows you how to manage multiple ATT&CK data sources, switch between different versions, and work with local files, URLs, and the official repository.

## Problem Scenarios

Use this guide when you need to:

- Switch between different ATT&CK versions for compatibility testing
- Load ATT&CK data from local files instead of the internet
- Fetch data from custom URLs or mirrors
- Manage multiple data sources in a production application
- Cache and reuse data sources efficiently

## Switch Between ATT&CK Versions

### Compare Multiple Versions

```typescript
import { registerDataSource, loadDataModel, DataSource } from '@mitre-attack/attack-data-model';

async function compareVersions() {
    const versions = ['15.0', '15.1'];
    const models: { [version: string]: any } = {};

    // Load multiple versions
    for (const version of versions) {
        const dataSource = new DataSource({
            source: 'attack',
            domain: 'enterprise-attack',
            version: version,
            parsingMode: 'relaxed'
        });

        const uuid = await registerDataSource(dataSource);
        models[version] = loadDataModel(uuid);
    }

    // Compare technique counts
    versions.forEach(version => {
        const count = models[version].techniques.length;
        console.log(`ATT&CK ${version}: ${count} techniques`);
    });
}
```

### Use Latest Version

```typescript
// Omit version to get the latest available
const latestDataSource = new DataSource({
    source: 'attack',
    domain: 'enterprise-attack',
    // No version specified = latest
    parsingMode: 'relaxed'
});

const uuid = await registerDataSource(latestDataSource);
const latestModel = loadDataModel(uuid);
```

## Load from Local Files

### Prepare Local STIX Bundle

First, save a STIX bundle JSON file locally:

```bash
# Download ATT&CK data
curl -o enterprise-attack.json https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json
```

### Load from Local File

```typescript
import { DataSource } from '@mitre-attack/attack-data-model';
import path from 'path';

async function loadLocalData() {
    const filePath = path.resolve('./enterprise-attack.json');

    const localDataSource = new DataSource({
        source: 'file',
        filePath: filePath,
        parsingMode: 'relaxed'
    });

    try {
        const uuid = await registerDataSource(localDataSource);
        const model = loadDataModel(uuid);

        console.log(`Loaded ${model.techniques.length} techniques from local file`);
        return model;

    } catch (error) {
        console.error('Failed to load local file:', error);
        throw error;
    }
}
```

## Load from Custom URLs

### Load from URL Source

```typescript
async function loadFromUrl() {
    const customUrl = 'https://your-custom-server.com/attack-data.json';

    const urlDataSource = new DataSource({
        source: 'url',
        url: customUrl,
        parsingMode: 'relaxed'
    });

    const uuid = await registerDataSource(urlDataSource);
    const model = loadDataModel(uuid);

    return model;
}
```

### Load with Custom Headers

```typescript
async function loadWithAuth() {
    const dataSource = new DataSource({
        source: 'url',
        url: 'https://private-server.com/attack-data.json',
        requestOptions: {
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN',
                'X-Custom-Header': 'value'
            }
        },
        parsingMode: 'strict'
    });

    const uuid = await registerDataSource(dataSource);
    return loadDataModel(uuid);
}
```

## Manage Multiple Data Sources

### Data Source Registry Pattern

```typescript
class AttackDataManager {
    private dataSources: Map<string, string> = new Map();

    async registerSource(name: string, config: any): Promise<string> {
        const dataSource = new DataSource(config);
        const uuid = await registerDataSource(dataSource);
        this.dataSources.set(name, uuid);
        return uuid;
    }

    getModel(name: string) {
        const uuid = this.dataSources.get(name);
        if (!uuid) {
            throw new Error(`Data source '${name}' not registered`);
        }
        return loadDataModel(uuid);
    }

    async setupCommonSources() {
        // Enterprise latest
        await this.registerSource('enterprise-latest', {
            source: 'attack',
            domain: 'enterprise-attack',
            parsingMode: 'relaxed'
        });

        // Enterprise v15.0
        await this.registerSource('enterprise-v15', {
            source: 'attack',
            domain: 'enterprise-attack',
            version: '15.0',
            parsingMode: 'relaxed'
        });

        // Mobile latest
        await this.registerSource('mobile-latest', {
            source: 'attack',
            domain: 'mobile-attack',
            parsingMode: 'relaxed'
        });
    }
}

// Usage
const manager = new AttackDataManager();
await manager.setupCommonSources();

const enterpriseModel = manager.getModel('enterprise-latest');
const mobileModel = manager.getModel('mobile-latest');
```

## Handle Data Source Errors

### Graceful Fallback Pattern

```typescript
async function loadWithFallback() {
    const fallbackSources = [
        // Try latest first
        {
            source: 'attack',
            domain: 'enterprise-attack',
            parsingMode: 'relaxed'
        },
        // Fallback to specific version
        {
            source: 'attack',
            domain: 'enterprise-attack',
            version: '15.1',
            parsingMode: 'relaxed'
        },
        // Final fallback to local file
        {
            source: 'file',
            filePath: './backup-enterprise-attack.json',
            parsingMode: 'relaxed'
        }
    ];

    for (const config of fallbackSources) {
        try {
            const dataSource = new DataSource(config);
            const uuid = await registerDataSource(dataSource);
            const model = loadDataModel(uuid);

            console.log(`Successfully loaded from source: ${config.source}`);
            return model;

        } catch (error) {
            console.warn(`Failed to load from ${config.source}:`, error.message);
            continue;
        }
    }

    throw new Error('All data sources failed');
}
```

### Validate Data Source Before Use

```typescript
async function validateDataSource(config: any): Promise<boolean> {
    try {
        const dataSource = new DataSource(config);
        const uuid = await registerDataSource(dataSource);
        const model = loadDataModel(uuid);

        // Basic validation checks
        const hasMinimumTechniques = model.techniques.length > 100;
        const hasBasicTactics = model.tactics.length > 5;
        const hasGroups = model.groups.length > 0;

        if (hasMinimumTechniques && hasBasicTactics && hasGroups) {
            console.log('✅ Data source validation passed');
            return true;
        } else {
            console.warn('⚠️  Data source seems incomplete');
            return false;
        }

    } catch (error) {
        console.error('❌ Data source validation failed:', error);
        return false;
    }
}
```

## Cache and Performance

### Implement Simple Caching

```typescript
class CachedDataManager {
    private cache: Map<string, any> = new Map();

    private getCacheKey(config: any): string {
        return JSON.stringify(config);
    }

    async loadData(config: any) {
        const cacheKey = this.getCacheKey(config);

        // Check cache first
        if (this.cache.has(cacheKey)) {
            console.log('📋 Loading from cache');
            return this.cache.get(cacheKey);
        }

        // Load fresh data
        console.log('🌐 Loading fresh data');
        const dataSource = new DataSource(config);
        const uuid = await registerDataSource(dataSource);
        const model = loadDataModel(uuid);

        // Cache the result
        this.cache.set(cacheKey, model);

        return model;
    }

    clearCache() {
        this.cache.clear();
        console.log('🗑️  Cache cleared');
    }
}
```

## Production Configuration

### Environment-Based Data Sources

```typescript
function getDataSourceConfig(): any {
    const environment = process.env.NODE_ENV || 'development';

    switch (environment) {
        case 'production':
            return {
                source: 'attack',
                domain: 'enterprise-attack',
                version: '15.1', // Pin version in production
                parsingMode: 'strict' // Strict validation in production
            };

        case 'staging':
            return {
                source: 'url',
                url: process.env.STAGING_ATTACK_URL,
                parsingMode: 'relaxed'
            };

        case 'development':
        default:
            return {
                source: 'file',
                filePath: './dev-data/enterprise-attack.json',
                parsingMode: 'relaxed'
            };
    }
}

// Usage
const config = getDataSourceConfig();
const dataSource = new DataSource(config);
```

## Monitoring and Logging

### Add Data Source Monitoring

```typescript
async function loadWithMonitoring(config: any) {
    const startTime = Date.now();

    try {
        console.log('📡 Starting data source load:', config.source);

        const dataSource = new DataSource(config);
        const uuid = await registerDataSource(dataSource);
        const model = loadDataModel(uuid);

        const loadTime = Date.now() - startTime;
        console.log(`✅ Load completed in ${loadTime}ms`);
        console.log(`📊 Loaded: ${model.techniques.length} techniques, ${model.groups.length} groups`);

        return model;

    } catch (error) {
        const loadTime = Date.now() - startTime;
        console.error(`❌ Load failed after ${loadTime}ms:`, error.message);
        throw error;
    }
}
```

## Key Takeaways

- **Version Management**: Pin specific versions in production, use latest for development
- **Fallback Strategy**: Always have backup data sources for reliability
- **Validation**: Verify data quality after loading, especially with custom sources
- **Caching**: Implement caching for frequently accessed data to improve performance
- **Monitoring**: Log data source performance and success rates for troubleshooting
- **Environment Configuration**: Use different data sources for different deployment environments

## Related Guides

- [Handle Parsing Errors Gracefully](./error-handling) - Manage data quality issues
- [Extend Schemas with Custom Fields](./extend-schemas) - Customize data structures
- [Performance Optimization](./performance) - Scale for large datasets

---
