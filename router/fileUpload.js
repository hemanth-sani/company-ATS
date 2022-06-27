const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;

const path = require('path');
const express = require('express');

const Candidate= require('../models/candidate');
const response = require('../utils/Response');
const { setTimeout } = require('timers/promises');


// const s3 = new aws.S3({apiVersion: '2006-03-01'});

const s3= new aws.S3({
    accessKeyId:process.env.AWS_Hemanth_ID,
    secretAccessKey:process.env.AWS_Hemanth_Key
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
            exports.uniqueId = unique;
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


router.post("/upload",upload.array('upload'),(req,res,next)=>{
    
//     setTimeout(()=>{
        
//         console.log(candidateId);
//         const candidateId = Candidate.findById(convertToObjectID(req.body.candidateid));
//         if(!candidateId){
//             throw new Error("Candidate details already not found!");
//         }
//         const candidate= Candidate.updateOne({resumeId,uniqueId});
//         response.successReponse({status:201,result:candidate,res});
// },2000)
});

module.exports = router;