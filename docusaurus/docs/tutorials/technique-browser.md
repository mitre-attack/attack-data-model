import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Building a Technique Browser

<WorkInProgressNotice />

**Create a complete application that browses ATT&CK techniques**

In this tutorial, you'll build a complete command-line application that lets you browse and search ATT&CK techniques interactively. You'll learn to work with multiple object types, implement search functionality, and create a practical tool you can use and extend.

## What You'll Build

A command-line technique browser with these features:

- Interactive menu system
- Search techniques by name or ATT&CK ID
- Browse techniques by tactic
- View technique details with relationships
- Navigate between parent techniques and sub-techniques

## Prerequisites

Complete the **[Your First ATT&CK Query](./your-first-query)** tutorial first to understand the basics.

## Step 1: Set Up the Project

Create a new project directory:

```bash
mkdir attack-technique-browser
cd attack-technique-browser
npm init -y
```

Install dependencies including a library for interactive prompts:

```bash
npm install @mitre-attack/attack-data-model prompts
npm install -D typescript tsx @types/node @types/prompts
```

## Step 2: Create the Core Browser Class

Create `technique-browser.ts` with the foundation of our browser:

```typescript
import { registerDataSource, loadDataModel, DataSource, AttackDataModel, TechniqueImpl } from '@mitre-attack/attack-data-model';
import prompts from 'prompts';

class TechniqueBrowser {
    private attackDataModel?: AttackDataModel;
    private isInitialized = false;

    async initialize(): Promise<void> {
        console.log('🎯 Initializing ATT&CK Technique Browser...\n');

        const dataSource = new DataSource({
            source: 'attack',
            domain: 'enterprise-attack',
            version: '15.1',
            parsingMode: 'relaxed'
        });

        try {
            const uuid = await registerDataSource(dataSource);

            if (uuid) {
                this.attackDataModel = loadDataModel(uuid);
                this.isInitialized = true;

                console.log(`✅ Loaded ${this.attackDataModel.techniques.length} techniques`);
                console.log(`✅ Loaded ${this.attackDataModel.tactics.length} tactics\n`);
            }
        } catch (error) {
            console.error('❌ Failed to initialize:', error);
            throw error;
        }
    }

    private ensureInitialized(): AttackDataModel {
        if (!this.isInitialized || !this.attackDataModel) {
            throw new Error('Browser not initialized. Call initialize() first.');
        }
        return this.attackDataModel;
    }

    // We'll add more methods here...
}
```

## Step 3: Add the Main Menu

Add the main menu system to the `TechniqueBrowser` class:

```typescript
    async run(): Promise<void> {
        this.ensureInitialized();

        let running = true;

        while (running) {
            console.log('\n' + '='.repeat(50));
            console.log('🎯 ATT&CK Technique Browser');
            console.log('='.repeat(50));

            const response = await prompts({
                type: 'select',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { title: '🔍 Search techniques by name', value: 'search' },
                    { title: '🏷️  Find technique by ATT&CK ID', value: 'findById' },
                    { title: '🎯 Browse techniques by tactic', value: 'browseByTactic' },
                    { title: '📊 Show statistics', value: 'stats' },
                    { title: '👋 Exit', value: 'exit' }
                ]
            });

            switch (response.action) {
                case 'search':
                    await this.searchTechniques();
                    break;
                case 'findById':
                    await this.findTechniqueById();
                    break;
                case 'browseByTactic':
                    await this.browseByTactic();
                    break;
                case 'stats':
                    await this.showStatistics();
                    break;
                case 'exit':
                    running = false;
                    console.log('\n👋 Thanks for using ATT&CK Technique Browser!');
                    break;
                default:
                    console.log('Invalid selection. Please try again.');
            }
        }
    }
```

## Step 4: Implement Search Functionality

Add these methods to implement search features:

```typescript
    private async searchTechniques(): Promise<void> {
        const attackDataModel = this.ensureInitialized();

        const response = await prompts({
            type: 'text',
            name: 'searchTerm',
            message: 'Enter search term (technique name):',
            validate: value => value.length < 1 ? 'Search term cannot be empty' : true
        });

        if (!response.searchTerm) return;

        const searchTerm = response.searchTerm.toLowerCase();
        const matches = attackDataModel.techniques.filter(technique =>
            technique.name.toLowerCase().includes(searchTerm)
        );

        if (matches.length === 0) {
            console.log(`\n❌ No techniques found containing "${response.searchTerm}"`);
            return;
        }

        console.log(`\n🔍 Found ${matches.length} technique(s):`);
        matches.slice(0, 10).forEach((technique, index) => {
            const attackId = technique.external_references[0].external_id;
            const isSubTech = technique.x_mitre_is_subtechnique ? ' (Sub-technique)' : '';
            console.log(`${index + 1}. ${technique.name} (${attackId})${isSubTech}`);
        });

        if (matches.length > 10) {
            console.log(`... and ${matches.length - 10} more`);
        }

        await this.selectAndViewTechnique(matches.slice(0, 10));
    }

    private async findTechniqueById(): Promise<void> {
        const attackDataModel = this.ensureInitialized();

        const response = await prompts({
            type: 'text',
            name: 'attackId',
            message: 'Enter ATT&CK ID (e.g., T1003, T1055.001):',
            validate: value => value.length < 1 ? 'ATT&CK ID cannot be empty' : true
        });

        if (!response.attackId) return;

        const technique = attackDataModel.techniques.find(tech =>
            tech.external_references[0].external_id.toLowerCase() === response.attackId.toLowerCase()
        );

        if (!technique) {
            console.log(`\n❌ No technique found with ID "${response.attackId}"`);
            return;
        }

        await this.viewTechniqueDetails(technique);
    }
```

## Step 5: Add Technique Viewing

Add methods to display technique details:

```typescript
    private async selectAndViewTechnique(techniques: TechniqueImpl[]): Promise<void> {
        if (techniques.length === 0) return;

        const choices = techniques.map((technique, index) => ({
            title: `${technique.name} (${technique.external_references[0].external_id})`,
            value: index
        }));

        choices.push({ title: '← Back to main menu', value: -1 });

        const response = await prompts({
            type: 'select',
            name: 'selection',
            message: 'Select a technique to view details:',
            choices
        });

        if (response.selection >= 0) {
            await this.viewTechniqueDetails(techniques[response.selection]);
        }
    }

    private async viewTechniqueDetails(technique: TechniqueImpl): Promise<void> {
        console.log('\n' + '='.repeat(60));
        console.log(`📋 ${technique.name}`);
        console.log('='.repeat(60));

        const attackId = technique.external_references[0].external_id;
        console.log(`ATT&CK ID: ${attackId}`);

        if (technique.x_mitre_is_subtechnique) {
            console.log('Type: Sub-technique');
            const parent = technique.getParentTechnique();
            if (parent) {
                console.log(`Parent: ${parent.name} (${parent.external_references[0].external_id})`);
            }
        } else {
            console.log('Type: Parent technique');
            const subtechniques = technique.getSubtechniques();
            if (subtechniques.length > 0) {
                console.log(`Sub-techniques: ${subtechniques.length}`);
            }
        }

        console.log(`\nPlatforms: ${technique.x_mitre_platforms?.join(', ') || 'Not specified'}`);

        const tactics = technique.getTactics();
        console.log(`Tactics: ${tactics.map(t => t.name).join(', ')}`);

        console.log(`\nDescription:`);
        console.log(technique.description);

        await prompts({
            type: 'confirm',
            name: 'continue',
            message: 'Press Enter to continue...',
            initial: true
        });
    }
```

## Step 6: Add Browse by Tactic Feature

Add the ability to browse techniques organized by tactic:

```typescript
    private async browseByTactic(): Promise<void> {
        const attackDataModel = this.ensureInitialized();

        const tactics = attackDataModel.tactics.sort((a, b) => a.name.localeCompare(b.name));

        const choices = tactics.map(tactic => ({
            title: `${tactic.name} - ${tactic.description.substring(0, 60)}...`,
            value: tactic
        }));

        choices.push({ title: '← Back to main menu', value: null });

        const response = await prompts({
            type: 'select',
            name: 'tactic',
            message: 'Select a tactic to browse techniques:',
            choices
        });

        if (!response.tactic) return;

        const tacticTechniques = attackDataModel.techniques.filter(technique =>
            technique.getTactics().some(t => t.id === response.tactic.id)
        );

        console.log(`\n🎯 Techniques for "${response.tactic.name}" (${tacticTechniques.length} total):`);

        await this.selectAndViewTechnique(tacticTechniques);
    }

    private async showStatistics(): Promise<void> {
        const attackDataModel = this.ensureInitialized();

        const totalTechniques = attackDataModel.techniques.length;
        const parentTechniques = attackDataModel.techniques.filter(t => !t.x_mitre_is_subtechnique).length;
        const subTechniques = attackDataModel.techniques.filter(t => t.x_mitre_is_subtechnique).length;

        console.log('\n📊 ATT&CK Statistics:');
        console.log(`Total Techniques: ${totalTechniques}`);
        console.log(`Parent Techniques: ${parentTechniques}`);
        console.log(`Sub-techniques: ${subTechniques}`);
        console.log(`Total Tactics: ${attackDataModel.tactics.length}`);
        console.log(`Total Groups: ${attackDataModel.groups.length}`);
        console.log(`Total Software: ${attackDataModel.malware.length + attackDataModel.tools.length}`);

        await prompts({
            type: 'confirm',
            name: 'continue',
            message: 'Press Enter to continue...',
            initial: true
        });
    }
```

## Step 7: Create the Main Application File

Create `app.ts` to tie everything together:

```typescript
import { TechniqueBrowser } from './technique-browser.js';

async function main() {
    const browser = new TechniqueBrowser();

    try {
        await browser.initialize();
        await browser.run();
    } catch (error) {
        console.error('❌ Application error:', error);
        process.exit(1);
    }
}

main().catch(console.error);
```

## Step 8: Add TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

## Step 9: Add Package Scripts

Update your `package.json` to include helpful scripts:

```json
{
  "scripts": {
    "start": "npx tsx app.ts",
    "dev": "npx tsx --watch app.ts",
    "build": "npx tsc",
    "run": "node dist/app.js"
  },
  "type": "module"
}
```

## Step 10: Run Your Application

Start your technique browser:

```bash
npm start
```

You should see an interactive menu that lets you explore ATT&CK techniques in multiple ways!

## Testing Your Browser

Try these actions to explore your application:

1. **Search for "credential"** - find techniques related to credential access
2. **Look up technique "T1003"** - view details about OS Credential Dumping
3. **Browse the "Initial Access" tactic** - see how adversaries get initial footholds
4. **Check statistics** - understand the scope of ATT&CK data

## What You've Learned

In this tutorial, you've learned how to:

1. **Structure a complete application** using the ATT&CK Data Model
2. **Implement search functionality** across technique names and IDs
3. **Navigate relationships** between techniques, tactics, and sub-techniques
4. **Create interactive menus** for user-friendly data exploration
5. **Organize techniques by tactics** to understand adversary goals
6. **Display comprehensive technique details** including relationships

## Key Concepts Mastered

- **TechniqueImpl methods**: `getTactics()`, `getParentTechnique()`, `getSubtechniques()`
- **Relationship navigation**: Moving between related ATT&CK objects
- **Data filtering and searching**: Finding specific techniques in large datasets
- **Application architecture**: Organizing code into reusable classes
- **User interaction**: Creating friendly command-line interfaces

## Extending Your Browser

Consider adding these features:

- Export search results to JSON or CSV
- Add filtering by platforms (Windows, Linux, macOS)
- Include software and groups that use techniques
- Add bookmarking for frequently viewed techniques
- Implement technique comparison features

## Next Steps

You're now ready for more advanced topics:

- **[Understanding ATT&CK Relationships](./relationships)** - Master complex relationship navigation
- **[How-to Guides](../how-to-guides/)** - Solve specific problems like validation and schema extension
- **[Reference Documentation](../reference/)** - Explore the complete API

---
