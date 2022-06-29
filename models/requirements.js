const mongoose= require('mongoose');

const requirementsSchema =  mongoose.Schema({

    ClientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    },
    RequirementName:{
        type:String,
        
    },
    ClosedDate:String,
    JobCode:String,
    RequirementType:String,
    Location:String,
    Experience:String,
    Postions:String,
    NoOfPosts:String,
    RGMspoc:String,
    Skills:[String],
    PrimarySkill:String,
    SecondarySkills:[String],
CreatedDate:String,
    AssignedAM:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    AssignedIA:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    Status:{
        type:String,
        enum:['ACTIVE','INACTIVE'],
        default:'ACTIVE'
    },
    Comment:String,
    MaxCTC:Number,
    ECVS:Number,
    Description:String,
    Suggestion:String,
    InternalJobCode:String,
    submittedcandidates :{
        type:Number,
        default:0
    },
    

});




module.exports = mongoose.model("Requirement", requirementsSchema);