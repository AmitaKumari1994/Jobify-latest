import User from "../models/User.js";
import {StatusCodes} from 'http-status-codes';
import {BadRequestError,NotFoundError,UnAuthenticatedError} from "../errors/index.js";
import Job from "../models/Job.js";
import mongoose from 'mongoose'
import moment from 'moment'
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
    const {status,jobType,sort,search} =req.query

    const queryObject = {
        createdBy:req.user.userId
    }

    // //add stuff based on condition

    if(status && status!=='all'){
        queryObject.status = status
    }

    if(jobType && jobType!=='all'){
        queryObject.jobType = jobType
    }

    if(search){
        queryObject.position = {$regex: search, $options:'i'}
    }
     
    //NO AWAIT
    console.log(queryObject)
    let result = Job.find(queryObject)

    //chain sort conditions
    if(sort === 'latest'){
        result = result.sort('-createdAt')
    }

    if(sort === 'oldest'){
        result = result.sort('createdAt')
    }

    if(sort === 'a-z'){
        result = result.sort('a-z')
    }

    if(sort === 'z-a'){
        result = result.sort('-position')
    }

    //  const jobs = await Job.find({createdBy:req.user.userId,status})

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)

     const jobs = await result

     const totalJobs = await Job.countDocuments(queryObject)
     const numOfPages = Math.ceil(totalJobs/limit)
    res
        .status(StatusCodes.OK)
        .json({jobs,totalJobs, numofPages})
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
        let monthlyApplications  = await Job.aggregate([
            {$match :{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
            {
                $group:{
                    _id:{year: {$year : '$createdAt'}, month: {$month:'$createdAt'}},
                    count: {$sum:1},
                },
            },

            //response before sort
            //   {
            //     "defaultStats": {
            //         "pending": 31,
            //         "interview": 32,
            //         "declined": 27
            //     },
            //     "monthlyApplications": [
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 10
            //             },
            //             "count": 9
            //         },
            //         {
            //             "_id": {
            //                 "year": 2023,
            //                 "month": 2
            //             },
            //             "count": 9
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 7
            //             },
            //             "count": 6
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 4
            //             },
            //             "count": 10
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 12
            //             },
            //             "count": 8
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 5
            //             },
            //             "count": 8
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 6
            //             },
            //             "count": 5
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 11
            //             },
            //             "count": 7
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 9
            //             },
            //             "count": 5
            //         },
            //         {
            //             "_id": {
            //                 "year": 2023,
            //                 "month": 1
            //             },
            //             "count": 9
            //         },
            //         {
            //             "_id": {
            //                 "year": 2023,
            //                 "month": 3
            //             },
            //             "count": 6
            //         },
            //         {
            //             "_id": {
            //                 "year": 2022,
            //                 "month": 8
            //             },
            //             "count": 8
            //         }
            //     ]
            // // }
            {$sort: {'_id.year':-1, '_id.month':-1}},
            {$limit:6}
        ])

        monthlyApplications = monthlyApplications.map((item)=>{
            const{
                _id:{year,month},
                count,
            } = item

            const date = moment()
            .month(month-1)
            .year(year)
            .format('MMM Y')
            return {date,count}
        })
        .reverse()
        res.status(StatusCodes.OK).json({defaultStats , monthlyApplications})
    

    
}

export {createJob,deleteJob,updateJob,getAllJob,showStats}