import jobsModel from "../models/jobsModel.js"
import mongoose from "mongoose"
import moment from 'moment'

// ========== Create Jobs ============
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        return next(new Error('Please Provide All Fields'))
    }

    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({ job });
}

// ========== Get All Jobs ============
export const getAllJobsController = async (req, res, next) => {
    const { status, workType, search, sort } = req.query
    // conditions for searching filters
    const queryObject = {
        createdBy: req.user.userId
    }
    // logic filters
    if (status && status !== 'all') {
        queryObject.status = status
    }

    if (workType && workType != 'all') {
        queryObject.workType = workType
    }

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }

    let queryResult = jobsModel.find(queryObject)

    //sorting
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt')
    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt')
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort('position')
    }
    if (sort === 'z-a') {
        queryResult = queryResult.sort('-position')
    }

    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    queryResult = queryResult.skip(skip).limit(limit)

    // jobs count
    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs / limit)

    const jobs = await queryResult

    // const jobs = await jobsModel.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage
    })
}

// ========== Update Jobs ============
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    //validation
    if (!company || !position) {
        return next(new Error('Please provide all fields'))
    }

    // find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        return next(new Error('No job found with the given id'))
    }

    if (req.user.userId !== job.createdBy.toString()) {
        return next(new Error("You're not authorized to update this job"))
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    //res
    res.status(200).json({ updateJob })
}

// ========== Delete Jobs ============
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    // find job
    const job = await jobsModel.findOne({ _id: id })
    if (!job) {
        return next(new Error('No job found with the given ID'))
    }

    if (req.user.userId !== job.createdBy.toString()) {
        return next(new Error("You're not authorized to delete this job"))
    }

    await job.deleteOne()
    res.status(200).json({ message: "Success, Job deleted!" })
}

// ========== Jobs Stats and Filters============
export const jobStatsController = async (req, res, next) => {
    const stats = await jobsModel.aggregate([
        // search by user jobs
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(`${req.user.userId}`)
            }
        },
        {
            $group: {
                _id: '$status', count: { $sum: 1 }
            }
        }
    ])

    const statsObj = stats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
    }, {});

    // Provide defaults to prevent undefined values
    const defaultStats = {
        interview: statsObj.interview,
        pending: statsObj.pending,
        reject: statsObj.reject
    };

    // monthly yearly stats
    let monthlyApplications = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(`${req.user.userId}`)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1
                }
            }
        }
    ])

    monthlyApplications = monthlyApplications.map((item) => {
        const {
            _id: { year, month },
            count
        } = item
        const date = moment().month(month - 1).year(year).format("MMM Y")
        return { date, count }
    }).reverse()

    res.status(200).json({ totalJob: stats.length, defaultStats, monthlyApplications })
}