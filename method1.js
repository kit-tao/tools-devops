const fs = require('fs');
const lineRead = require('line-read');

const filePath = 'serverless.yml'; // Replace with the actual path to your YAML file

let isInsideProviderBlock = false;
let isInsideTagsBlock = false;
let linesToRemove = 0;
const updatedLines = [];

lineRead.eachLine(filePath, (line, last) => {
  if (line.includes('provider:')) {
    isInsideProviderBlock = true;
  }

  if (isInsideProviderBlock && line.includes('tags:')) {
    isInsideTagsBlock = true;
  }

  if (isInsideTagsBlock) {
    linesToRemove++;

    if (line.trim() === '' && linesToRemove > 0) {
      isInsideTagsBlock = false;
      linesToRemove = 0;
    }
  }

  if (!isInsideTagsBlock) {
    updatedLines.push(line);
  }

  if (last) {
    // Write the updated lines back to the file
    const updatedYamlContent = updatedLines.join('\n');
    fs.writeFileSync(filePath, updatedYamlContent, 'utf8');
    
    console.log('Tags block deleted.');
  }
});
