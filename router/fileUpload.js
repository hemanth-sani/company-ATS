const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const { S3Client } = require('@aws-sdk/client-s3')
const path = require('path');
const express = require('express');

const s3 = new S3Client({
  accessKeyId:process.env.AWS_Hemanth_ID,
  secretAccessKey:process.env.AWS_Hemanth_Key,
  region:"ap-south-1"
});


var unique;
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hemanth-fileupload',
        metadata: (req,file, cb)=>{
            cb(null,{fieldName: file.fieldname});
        },
        key:(req, file, cb) =>{
            const ext = file.originalname;
            unique = uuid();
            cb(null, `${unique}-${ext}`);
            console.log(unique);
        }
    })
});


// const storage = multer.diskStorage({
//     destination:(req,file,cb) =>{
//         cb(null,'uploads');
//     },
//     filename:(req,file,cb)=>{
//         const { originalname }=file;
//         cb(null, `${uuid()}-${originalname}`);
//     }
// });

// const upload = multer({storage});


const router = express.Router();


router.post("/upload",upload.array('upload'));

module.exports = router;


// // const s3 = new aws.S3({apiVersion: '2006-03-01'});

// // const storage = multer.diskStorage({
// //     destination:(req,file,cb) =>{
// //         cb(null,'uploads');
// //     },
// //     filename:(req,file,cb)=>{
// //         const { originalname }=file;
// //         cb(null, `${uuid()}-${originalname}`);
// //     }
// // });

// // const upload = multer({storage});