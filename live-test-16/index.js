const express = require('express');
const multer = require('multer');

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage});

// Route for the home page
app.get('/', function (req, res) {
    res.send("Server is running! Use POST /upload/single or POST /upload/multiple");
});

// Route for single file upload
app.post("/upload/single", upload.single("file"), function (req, res) {

  if (!req.file) {
    return res.status(400).send("Please upload a file.");
  }
 
  res.send("File uploaded! File name: " + req.file.filename);
});

// Route for multiple file upload
app.post("/upload/multiple", upload.array("files", 5), function (req, res) {
 
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Please upload at least one file.");
  }
 
  const names = req.files.map(function (file) {
    return file.filename;
  });
 
  res.send("Files uploaded! File names: " + names.join(", "));
 
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})