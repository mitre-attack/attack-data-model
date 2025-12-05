import WorkInProgressNotice from '@site/src/components/WorkInProgressNotice';

# Your First ATT&CK Query

<WorkInProgressNotice />

In this tutorial, you'll learn how to install the ATT&CK Data Model library, load your first ATT&CK dataset, and explore techniques and tactics. By the end, you'll have a working script that can query ATT&CK data and understand the basic concepts of the ATT&CK framework.

## What You'll Build

You'll create a simple Node.js script that:

- Loads the latest ATT&CK Enterprise data
- Lists the first 5 techniques
- Shows the tactics associated with a technique
- Demonstrates basic relationship navigation

## Step 1: Set Up Your Project

First, create a new directory for your project and initialize it:

```bash
mkdir my-first-attack-query
cd my-first-attack-query
npm init -y
```

You should see output like:

```shell
Wrote to /path/to/my-first-attack-query/package.json
```

## Step 2: Install the ATT&CK Data Model

Install the ATT&CK Data Model library and TypeScript tools:

```bash
npm install @mitre-attack/attack-data-model
npm install -D typescript tsx @types/node
```

You should see the packages being installed. The installation may take a minute as it downloads all dependencies.

## Step 3: Create Your First Script

Create a file named `first-query.ts` and add the following code:

```typescript
import {
  registerDataSource,
  loadDataModel,
  DataSourceRegistration,
} from '@mitre-attack/attack-data-model';

async function exploreAttackData() {
  console.log('Loading ATT&CK Enterprise data...\n');

  // Step 1: Create a data source
  const dataSource = new DataSourceRegistration({
    source: 'attack', // Load from official ATT&CK repository
    domain: 'enterprise-attack', // Focus on Enterprise domain
    version: '17.1', // Use specific version for consistency
    parsingMode: 'relaxed', // Continue even if some data has minor issues
  });

  try {
    // Step 2: Register the data source
    const uuid = await registerDataSource(dataSource);

    if (uuid) {
      console.log('Data source registered successfully!\n');

      // Step 3: Load the data model
      const attackDataModel = loadDataModel(uuid);
      console.log(`Loaded ${attackDataModel.techniques.length} techniques\n`);

      // Step 4: Explore the first few techniques
      console.log('First 5 techniques:');
      attackDataModel.techniques.slice(0, 5).forEach((technique, index) => {
        console.log(
          `${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`,
        );
      });
    } else {
      console.error('Failed to register data source');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
exploreAttackData();
```

## Step 4: Run Your Script

Execute your script to see the ATT&CK data in action:

```bash
npx tsx first-query.ts
```

You should see output similar to:

```shell
Loading ATT&CK Enterprise data...

Data source registered successfully!

Loaded 196+ techniques

First 5 techniques:
1. OS Credential Dumping (T1003)
2. Boot or Logon Autostart Execution (T1547)
3. Process Injection (T1055)
4. Command and Scripting Interpreter (T1059)
5. Ingress Tool Transfer (T1105)
```

**Congratulations!** You've just loaded and explored your first ATT&CK dataset!

## Step 5: Explore Technique Details

Now let's look at more details about a specific technique. Add this code to your script after the previous console.log statements:

```typescript
            console.log('\nExamining a specific technique:');
            const firstTechnique = attackDataModel.techniques[0];
            
            console.log(`Name: ${firstTechnique.name}`);
            console.log(`ID: ${firstTechnique.external_references[0].external_id}`);
            console.log(`Description: ${firstTechnique.description.substring(0, 100)}...`);
            
            // Check if it's a subtechnique
            if (firstTechnique.x_mitre_is_subtechnique) {
                console.log('This is a sub-technique');
            } else {
                console.log('This is a parent technique');
            }
```

## Step 6: Discover Associated Tactics

ATT&CK techniques are organized under tactics (the "why" behind adversary actions). Let's explore this relationship:

```typescript
            console.log('\nAssociated tactics:');
            const killChainPhases = firstTechnique.kill_chain_phases || [];
            const tacticShortnames = killChainPhases
                .map(phase => phase.phase_name);

            const associatedTactics = attackDataModel.tactics.filter(
                tactic => tacticShortnames.includes(tactic.x_mitre_shortname)
            );

            if (associatedTactics.length > 0) {
                associatedTactics.forEach(tactic => {
                console.log(`- ${tactic.name}: ${tactic.description.replace(/\n/g, ' ').substring(0, 60)}...`);
                });
            } else {
            console.log('No tactics associated with this technique.');
            }
```

## Step 7: Run Your Enhanced Script

Run your enhanced script to see the additional information:

```bash
npx tsx first-query.ts
```

Your output should now include technique details and associated tactics, showing you the rich relationships within ATT&CK data.

## What You've Learned

In this tutorial, you've learned:

1. **How to install** the ATT&CK Data Model library
2. **How to create a DataSource** pointing to official ATT&CK data
3. **How to register and load** ATT&CK datasets
4. **How to access technique** properties like name, ID, and description
5. **How to navigate relationships** between techniques and tactics
6. **The difference** between parent techniques and sub-techniques

## Understanding the Code

Let's break down the key concepts you used:

- **DataSource**: Tells the library where to find ATT&CK data (official repository, local file, URL, etc.)
- **registerDataSource**: Validates and caches the data source, returning a unique identifier
- **loadDataModel**: Retrieves the cached AttackDataModel instance using the identifier
- **AttackDataModel**: The main class containing all ATT&CK objects with automatic relationship mapping
- **getTactics()**: A relationship navigation method that returns related tactics

## Next Steps

Now that you understand the basics, you're ready for the next tutorial:

- **[Building a Technique Browser](./technique-browser)** - Create a complete application that browses techniques

Or explore other documentation:

- **[How-to Guides](../how-to-guides/)** - Solve specific problems
- **[Reference](../../api/)** - Detailed API documentation
- **[Examples](https://github.com/mitre-attack/attack-data-model/tree/main/examples)** - More code samples

## Common Issues

**"Module not found" errors**: Make sure you've installed all dependencies with `npm install`

**Network errors during data loading**: The library downloads ATT&CK data from GitHub. Ensure you have internet connectivity.

**TypeScript compilation errors**: Make sure you're using `npx tsx` to run TypeScript directly, or compile with `npx tsc` first.

---
