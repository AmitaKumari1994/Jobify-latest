import User from "../models/User.js";
import {StatusCodes} from 'http-status-codes';
import {BadRequestError,UnAuthenticatedError} from "../errors/index.js";
import Job from "../models/Job.js";


const createJob = async (req,res)=>{
    const {position,company} = req.body

    if(!position || !company){
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async (req,res)=>{
    res.send('delete job')
}

const updateJob = async (req,res)=>{
    res.send('update job')
}

const getAllJob = async (req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId})
    res
        .status(StatusCodes.OK)
        .json({jobs,totalJobs: jobs.length , numofPages:1})
}

const showStats = async (req,res)=>{
    res.send('show stats')
}

export {createJob,deleteJob,updateJob,getAllJob,showStats}