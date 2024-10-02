const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'dist');
const destination = path.join(__dirname, '..', 'public');

// Remove existing public directory
if (fs.existsSync(destination)) {
  fs.rmSync(destination, { recursive: true, force: true });
}

// Rename dist to public
fs.renameSync(source, destination);

console.log('Successfully moved dist to public');