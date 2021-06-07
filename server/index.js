const express = require('express');
const multer = require('multer')
const cors = require('cors');
const path = require('path');
const gm = require('gm');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const app = express();
const port = 3080;

app.use(cors());
app.use(express.json());
app.use( '/' , express.static( 'client/build' ) );



async function convertToImages(filename) {
  const stream = await fs.readFileSync(filename);
  const pdfDoc = await PDFDocument.load(stream);
  console.log(pdfDoc.getPageCount());
 
  let baseName = filename.split('/')[1];
  baseName = baseName.split('.')[0];
  baseName = baseName.replace(/\s/g, "");
  console.log(baseName);
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    // console.log(i);
    convertFrame(stream, i, baseName);
  }
}

const convertFrame = (stream, index, baseName) => {
  gm(stream) // The name of your pdf
  .selectFrame(index)
  .setFormat("jpg")
  .quality(100) // Quality from 0 to 100
  .write("client/src/assets/"+baseName+(index+10)+".jpg", function(error){
    // Callback function executed when finished
    if (!error) {
      console.log("Finished saving JPG");
    } else {
      console.log("There was an error!", error);
    }
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 500000000 // 1000000 Bytes = 1 MB
  },
  // fileFilter: function (req, file, callback) {
  //   var ext = path.extname(file.originalname);
  //   if(ext !== '.pdf') {
  //       return callback(new Error('Only images are allowed'))
  //   }
  //   callback(null, true)
  // }
}).single('file');

app.post('/api/file', (req, res) => {
  console.log('Adding file:::', req.file);
  upload(req, res, function (err) {
    console.log(req.file.path);
    convertToImages(req.file.path);
    if (err instanceof multer.MulterError) {
      console.log('Error uploading file1', err);
      return res.status(500).json(err)
    } else if (err) {
      console.log('Error uploading file2', err);
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
});

app.get('/api/files/:name', (req, res) => {
  console.log('api/files/name called!')
  fs.readdir("./client/src/assets", function (err, imgFiles) {
    // imgFiles = imgFiles.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    imgFiles = imgFiles.filter(item => path.basename(item).includes(req.params.name));
    console.log("here");
    console.log(imgFiles);
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      })
    }

    // let fileInfos = [];

    // imgFiles.forEach((file) => {
    //   console.log(file);
    //   fileInfos.push({
    //     name: file,
    //     url: file,
    //   });
    // });

    res.status(200).json(imgFiles);
  });
  console.log("Done");
});

app.get('/api/files', (req, res) => {
  console.log('api/files called!')
  fs.readdir("./client/src/assets", function (err, imgFiles) {
    // imgFiles = imgFiles.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    imgFiles = imgFiles.filter(item => item.includes("10.jpg"));
    console.log("here");
    console.log(imgFiles);
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      })
    }

    // let fileInfos = [];

    // imgFiles.forEach((file) => {
    //   console.log(file);
    //   fileInfos.push({
    //     name: file,
    //     url: file,
    //   });
    // });

    res.status(200).json(imgFiles);
  });
  console.log("Done");
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});