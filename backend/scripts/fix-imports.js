import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '../dist');

function processFile(filePath) {
  let content = readFileSync(filePath, 'utf8');
  
  // Fix .js extensions in imports
  content = content.replace(/(from\s+['"]\.*?)(?<!\.js)(['"])/g, '$1.js$2');
  
  // Fix directory imports
  content = content.replace(/(from\s+['"]\.*?\/)(['"])/g, '$1index.js$2');
  
  writeFileSync(filePath, content, 'utf8');
}

function processDirectory(directory) {
  const files = readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = join(directory, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

console.log('Fixing imports in compiled files...');
processDirectory(distDir);
console.log('Import fixes completed successfully!');
