const fs = require('fs');
const axios = require( 'axios');



function cat(path) {
  
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1); 
    } else {
   
      console.log(data);
    }
  });
}

async function webcat(url) {
    try {
        const response = await axios.get(url);
        console.log(repsonse.data);

    }catch(error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        process.exit(1);
    }

}


const filePath = process.argv[2];



