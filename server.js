const express = require('express');
const multer = require('multer');
const fs = require('fs');
const {execSync} = require('child_process');


const app = express();
const fileStore = {};


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

app.post('/add', upload.array('files'), (req,res)=>{
    const files = req.files;
    for (const file of files){
        const {originalname, path} = file;
        if(fileStore[originalname]){
            return res.json({error: 'File already exists'});
        }
        fileStore[originalname] = path;
    }
    return res.json({ files });
})

app.get('/list', (req, res) => {
  const files = Object.keys(fileStore);
  return res.json({ files });
});

app.delete('/remove', (req, res) => {
  const filename = req.query.filename;
  if (fileStore[filename]) {
    fs.unlinkSync(fileStore[filename]); 
    delete fileStore[filename];
    return res.json({ message: 'File removed successfully' });
  } else {
    return res.json({ error: 'File not found' });
  }
});

function populateFileStore() {
    fs.readdirSync('files').forEach((filename) => {
        fileStore[filename] = `files/${filename}`;
    });
}

populateFileStore();
