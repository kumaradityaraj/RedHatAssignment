const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { execSync } = require('child_process');

const SERVER_URL = 'http://localhost:5000';

function addFiles(filenames) {
  const form = new FormData();
  for (const filename of filenames) {
    const fileStream = fs.createReadStream(filename);
    form.append('files', fileStream);
  }
  axios
    .post(`${SERVER_URL}/add`, form, {
      headers: form.getHeaders(),
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error:', error.response.data.error);
    });
}

function listFiles() {
  axios
    .get(`${SERVER_URL}/list`)
    .then((response) => {
      console.log(response.data.files);
    })
    .catch((error) => {
      console.error('Error:', error.response.data.error);
    });
}

function parseArguments(){
    const args = process.argv.slice(2);
    const command = args[0];

    switch(command) {
        case 'add': 
            const filenames = args.slice(1);
            addFiles(filenames);
            break;
        case 'ls':
            listFiles();
            break;
        default:
            console.error("Invalid command");
            break;
    }
}

parseArguments();