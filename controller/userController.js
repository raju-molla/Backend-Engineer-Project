const User = require('../model/user');
const Assignment = require('../model/assignment')
const Submission = require("../model/submission")
const bcrypt = require('bcrypt')
const secretkey = process.env.SECRET_KEY
const jwt= require('jsonwebtoken');
const jwtDecode = require('jwt-decode')
const path = require('path')

const register = async(req,res)=>{
    try{    
        const {password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        req.body.password = hashPassword;
        const user = new User(req.body);
        const data = await user.save();
        return res.status(200).json({
            mgs: "reg. successfully"
        })

    }
    catch(err){
        res.json(err);
    }
}


const logIn= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(user){
            const isValid = await bcrypt.compare(password,user.password);
            if(isValid){
                const data={
                    id:user._id,
                    userName: user.userName,
                    role: user.role
                }
                const token = jwt.sign(data,secretkey, {expiresIn: "5h"});
                return res.json({
                    mgs: 'Welcome loggin Successfully',
                    token
                })

            }
            else{
                return res.json({
                    mgs: "password is not matched"
                })
            }


    }
        else{
            return res.json({
                mgs: 'email is not matched!'
            })
        }
    }

    catch(err){
        return res.json({
            err
        })
    }
}



const assignment = async(req,res)=>{
    try{
        
        
        const assignment = new Assignment({
            ...req.body,
            mentor:req.user.id 
        });
        const submission = new Submission({
            mentor: req.user.id
        })
        
        const data = await assignment.save();
        await submission.save();
        return res.json({
            mgs: "assignment upload successfully",
            data
        })

    }
    catch(err){
        res.json({
            err
        })
    }
}

// student can submit his assessment

const sumbitAssessment = async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Submission.findById(
            {_id:id},
        )

        if(req.file){
            // console.log(req.file.path);
            data.link= req.file.path,
            data.student= req.user.id 
        }
        else{
            data.link= req.body.link;
            data.student = req.user.id
        }
        data.save();
        res.json({
            mgs: "file or link upload"
        })

    }
    catch(err){
        res.json({
            err
        })
    }
}


// grade update 

const gradeUpdate = async(req,res)=>{
    try{
        const id = req.params.id;
        // console.log(id);
        const data = await Submission.findByIdAndUpdate(
            {_id:id},
            {
                $set:req.body
            },
            {
                multi:true
            }
            
        )
        
        return res.json({
            mgs: "grade update successfully!",
        })
    }
    catch(err){
        res.json({
            mgs: err.message
        })
    }
}

// mentor can see his all assessment submission
const mentorsAllSubmission = async(req,res)=>{
    try{
        const {id} = req.user;
        const data = await Submission.find(
            {$or: [{mentor:id},{student:id}]}
        )
        return res.json({
            data
        })
    }
    catch(err){
        return res.json({
            mgs: err.message
        })
    }
}
// mentor can see all submission

const getAll = async(req,res)=>{
    try{
        const data = await Submission.find();
        return res.json({
            data
        })
    }
    catch(err){
        return res.json({
            mgs: err
        })
    }
}








module.exports ={
    register,
    logIn,
    assignment,
    sumbitAssessment,
    gradeUpdate,
    mentorsAllSubmission,
    getAll
}