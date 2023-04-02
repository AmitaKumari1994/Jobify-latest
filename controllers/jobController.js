import User from "../models/User.js";
import {StatusCodes} from 'http-status-codes';
import {BadRequestError,NotFoundError,UnAuthenticatedError} from "../errors/index.js";
import Job from "../models/Job.js";
import mongoose from 'mongoose'
import checkPersmissions from "../utils/checkPermission.js";


const createJob = async (req,res)=>{
    const {position,company} = req.body

    if(!position || !company){
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}



const updateJob = async (req,res)=>{
    const {id:jobId} = req.params
    const {company,position} = req.body

    if(!position || !company){
        throw new BadRequestError('Please provide all values')
    }

    if(!position || !company){
        throw new BadRequestError('Please provide all values')
    }

    const job = await Job.findOne({_id:jobId})

    if(!job){
        throw new NotFoundError(`No Job with id :${jobId}`)
    }

    checkPersmissions(req.user, job.createdBy)

    const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body , {
        new: true,
        runValidators : true, 
    })

    res.status(StatusCodes.OK).json({updatedJob})
}

const deleteJob = async(req,res)=>{
    const {id: jobId} = req.params

    const job = await Job.findOne({_id:jobId})

    if(!job){
        throw new NotFoundError(`No job with id : ${jobId}`)
    }

    checkPersmissions(req.user, job.createdBy)

    await job.remove()
    res.status(StatusCodes.OK).json({msg:"Job deleted successfully !!"})
    
}

const getAllJob = async (req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId})
    res
        .status(StatusCodes.OK)
        .json({jobs,totalJobs: jobs.length , numofPages:1})
}

const showStats = async (req,res)=>{
    let stats = await Job.aggregate([
        {$match: {createdBy:mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{_id:'$status',count: { $sum: 1 } } },
    ])
        //output of above group syntax
        // {
        //     "stats": [
        //         {
        //             "_id": "pending",
        //             "count": 31
        //         },
        //         {
        //             "_id": "interview",
        //             "count": 32
        //         },
        //         {
        //             "_id": "declined",
        //             "count": 27
        //         }
        //     ]
        // }

        stats = stats.reduce((acc,curr)=>{
            const {_id:title , count} = curr
            acc[title] = count
            return acc
        },{})

        const defaultStats = {
            pending:stats.pending || 0,
            interview:stats.interview || 0,
            declined:stats.declined || 0
        }
        let monthlyApplications  = []
        res.status(StatusCodes.OK).json({defaultStats , monthlyApplications})
    

    
}

export {createJob,deleteJob,updateJob,getAllJob,showStats}