const fs = require('fs');

const filePath = 'serverless.yml'; // Replace with the actual path to your YAML file

// Load the YAML content from the file
const yamlContent = fs.readFileSync(filePath, 'utf8');

// Define the YAML block to delete
const blockToDelete = `
  tags:`;


// Find the position of the provider block in the YAML content
const providerStartIndex = yamlContent.indexOf('provider:');
if (providerStartIndex !== -1) {
  // Find the position of the tags block within the provider block
  const tagsStartIndex = yamlContent.indexOf('tags:', providerStartIndex);
  
  if (tagsStartIndex !== -1) {
    // Find the end of the tags block
    const tagsEndIndex = yamlContent.indexOf('\n', tagsStartIndex);
    
    // Delete the tags block from the YAML content
    const updatedYamlContent = yamlContent.slice(0, tagsStartIndex) + yamlContent.slice(tagsEndIndex);
    
    // Write the updated YAML content back to the file
    fs.writeFileSync(`${filePath}-new`, updatedYamlContent, 'utf8');
    
    console.log('Tags block deleted.');
  } else {
    console.log('Tags block not found within the provider block.');
  }
} else {
  console.log('Provider block not found.');
}
