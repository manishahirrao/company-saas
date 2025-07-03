import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase URL or Anon Key in environment variables');
  process.exit(1);
}

// Extract project ref from URL
const projectRef = SUPABASE_URL.split('.')[0].replace('https://', '');
const outputPath = path.resolve(__dirname, '../frontend/src/lib/database.types.ts');

try {
  console.log('Generating TypeScript types from Supabase schema...');
  
  // Install @supabase/cli if not already installed
  try {
    execSync('npx supabase --version');
  } catch {
    console.log('Installing @supabase/cli...');
    execSync('npm install -g @supabase/cli', { stdio: 'inherit' });
  }
  
  // Generate types
  const command = `npx supabase gen types typescript --project-id ${projectRef} > ${outputPath}`;
  console.log(`Running: ${command}`);
  
  execSync(command, { stdio: 'inherit' });
  
  // Read the generated file
  let content = fs.readFileSync(outputPath, 'utf8');
  
  // Add a comment at the top
  const header = `// This file is auto-generated. Do not edit manually.
// Run \`npm run generate:types\` to update.

`;
  
  fs.writeFileSync(outputPath, header + content);
  
  console.log(`✅ Successfully generated types at ${outputPath}`);
} catch (error) {
  console.error('❌ Error generating types:', error);
  process.exit(1);
}
