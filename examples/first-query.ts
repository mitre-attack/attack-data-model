import {
  registerDataSource,
  loadDataModel,
  DataSourceRegistration,
} from '@mitre-attack/attack-data-model';

async function exploreAttackData() {
  console.log('🎯 Loading ATT&CK Enterprise data...\n');

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
      console.log('✅ Data source registered successfully!\n');

      // Step 3: Load the data model
      const attackDataModel = loadDataModel(uuid);
      console.log(`📊 Loaded ${attackDataModel.techniques.length} techniques\n`);

      // Step 4: Explore the first few techniques
      console.log('🔍 First 5 techniques:');
      attackDataModel.techniques.slice(0, 5).forEach((technique, index) => {
        console.log(
          `${index + 1}. ${technique.name} (${technique.external_references[0].external_id})`,
        );
      });
    } else {
      console.error('❌ Failed to register data source');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the function
exploreAttackData();
