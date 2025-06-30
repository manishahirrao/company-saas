import { testConnection } from '../src/database/config.js';
import { runMigrations } from '../src/database/migrate.js';

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    const isConnected = await testConnection();
    
    if (isConnected) {
      console.log('✅ Database connection successful!');
      
      console.log('\nRunning migrations...');
      await runMigrations();
      console.log('✅ Migrations completed successfully!');
    } else {
      console.error('❌ Failed to connect to the database');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error during database test:', error);
    process.exit(1);
  }
}

testDatabase().catch(console.error);
