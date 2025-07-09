const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix .js extensions in imports
  content = content.replace(/(from\s+['"]\.*?)(?<!\.js)(['"])/g, '$1.js$2');
  
  // Fix directory imports
  content = content.replace(/(from\s+['"]\.*?\/)(['"])/g, '$1index.js$2');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

console.log('Fixing imports in compiled files...');
processDirectory(distDir);
console.log('Import fixes completed!');
