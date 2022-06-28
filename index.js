const express = require('express');
const dotenv = require('dotenv');
const log = require('./utils/bunyanLogger');
const connectDB = require('./config/db')
const router = require('./router/router')
//
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');
// const uuid = require('uuid').v4;
// const multer = require("multer");

//
const uploadFile = require('./utils/awsupload');
const cors = require('cors');
const { errorResponse } = require('./utils/Response')
const error = require('./middleware/error')
dotenv.config({ path: './config.env' });

// const s3 = new aws.S3({apiVersion: '2006-03-01'});
const app = express();
const port = process.env.PORT || 5000;


connectDB();

app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PUT", "DELETE"]
}

//
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
//

app.use(cors(corsOptions))
app.use((req, res, next) => {
  // console.log(req.hostname, req.headers, req.path);
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
  try {
    
    const allowedMethods = ["POST", "GET", "PUT", "DELETE"];
    if (!allowedMethods.includes(req.method)) {
      // errorResponse({ status: 400, result: `${req.method} method is not allowed`, res })
      throw "not allowed"

    }
  } catch (error) {
    errorResponse({ status: 400, result: `${req.method} method is not allowed`, res })
  }
  next();
});

//
//var upload = multer({ dest: "uploads/" });

// var upload1 = multer({ storage: storage });
// var unique;
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'hemanth-upload',
//         metadata: (req,file, cb)=>{
//             cb(null,{fieldName: file.fieldname});
//         },
//         key:(req, file, cb) =>{
//             const ext = file.originalname;
//             unique = uuid();
//             cb(null, `${unique}-${ext}`);
//             console.log(unique);
//         }
//     })
// });

// app.post("/file", function (req, res, next) {
//   const file = req;
//   console.log("File name: ",file);
//   if (file) {
//     res.json(req.file);
//   } else throw "error";
// });

// app.post("/multiplefiles", upload.array("files"), function (req, res, next) {
//   const files = req.files;
//   if (Array.isArray(files) && files.length > 0) {
//     res.json(req.files);
//   } else {
//     res.status(400);
//     throw new Error("No file");
//   }
// });
//

app.use("/api/v1", router);
app.use(error)
app.use((req, res, next) => {

  errorResponse({ status: 404, result: "Requested resource  not found", res })
})





app.listen(port, () => {
  log.info({ module: 'index' }, `Server started on port ${port}`)
})


