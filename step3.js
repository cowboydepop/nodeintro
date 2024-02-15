const fs = require('fs').promises; 
const axios = require('axios');


async function cat(path) {
  try {
    
    const data = await fs.readFile(path, 'utf8');
    return data;
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
}


async function webCat(url) {
  try {
   
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching ${url}: ${error.message}`);
  }
}


function writeToConsole(data) {
  console.log(data);
}


async function writeToFile(filePath, data) {
  try {
    
    await fs.writeFile(filePath, data);
    console.log(`Data successfully written to ${filePath}`);
  } catch (error) {
    throw new Error(`Couldn't write ${filePath}: ${error.message}`);
  }
}


const args = process.argv.slice(2);


const outIndex = args.indexOf('--out');

if (outIndex !== -1 && outIndex < args.length - 2) {
  
  const outputFilePath = args[outIndex + 1];
  const inputPath = args[outIndex + 2];

  try {
    
    const data = inputPath.startsWith('http') ? await webCat(inputPath) : await cat(inputPath);

    
    await writeToFile(outputFilePath, data);
  } catch (error) {
    console.error(error.message);
    process.exit(1); 
  }
} else if (args.length === 1) {
 
  const inputPath = args[0];

  try {
    
    const data = inputPath.startsWith('http') ? await webCat(inputPath) : await cat(inputPath);

   
    writeToConsole(data);
  } catch (error) {
    console.error(error.message);
    process.exit(1); 
  }
} else {
  
  console.error('Invalid command. Please use --out output-filename.txt readfile-or-url');
  process.exit(1); 
}
