import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobController.js'

const router = express.Router()

// routes

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     JobRequest:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         company:
 *           type: string
 *           description: Name of the company
 *         position:
 *           type: string
 *           description: Job position
 *         status:
 *           type: string
 *           enum: [pending, interview, rejected]
 *           default: pending
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, remote, internship]
 *           default: full-time
 *     Jobs:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated job ID
 *         company:
 *           type: string
 *         position:
 *           type: string
 *         status:
 *           type: string
 *         workType:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the job
 */

/**
 * @swagger
 * tags:
 *  name: Jobs
 *  description: APIs related to Job Management
 */

/**
 * @swagger
 * /job/create-job:
 *  post:
 *      summary: Create a new job (Authentication Required)
 *      tags: [Jobs]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/JobRequest'
 *      responses:
 *          201:
 *              description: Job created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Jobs'
 *          400:
 *              description: Bad request - Missing required fields
 *          401:
 *              description: Unauthorized - No token provided
 */

/**
 * @swagger
 * /job/get-job:
 *  get:
 *      summary: Get all jobs for the logged-in user
 *      tags: [Jobs]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: status
 *            schema:
 *              type: string
 *              enum: [all, pending, interview, rejected]
 *            description: Filter jobs by status
 *          - in: query
 *            name: workType
 *            schema:
 *              type: string
 *              enum: [all, full-time, part-time, remote, internship]
 *            description: Filter jobs by work type
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *            description: Search for job positions
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *              enum: [latest, oldest, a-z, z-a]
 *            description: Sort jobs
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *              default: 1
 *            description: Pagination - page number
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              default: 10
 *            description: Pagination - results per page
 *      responses:
 *          200:
 *              description: List of jobs
 *          401:
 *              description: Unauthorized - No token provided
 */

/**
 * @swagger
 * /job/update-job/{id}:
 *  put:
 *      summary: Update an existing job (Authentication Required)
 *      tags: [Jobs]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Job ID to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/JobRequest'
 *      responses:
 *          200:
 *              description: Job updated successfully
 *          400:
 *              description: Bad request - Missing required fields
 *          401:
 *              description: Unauthorized - No token provided
 *          404:
 *              description: Job not found
 */

/**
 * @swagger
 * /job/delete-job/{id}:
 *  delete:
 *      summary: Delete a job (Authentication Required)
 *      tags: [Jobs]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Job ID to delete
 *      responses:
 *          200:
 *              description: Job deleted successfully
 *          401:
 *              description: Unauthorized - No token provided
 *          404:
 *              description: Job not found
 */

/**
 * @swagger
 * /job/job-stats:
 *  get:
 *      summary: Get job statistics (Authentication Required)
 *      tags: [Jobs]
 *      security:
 *          - BearerAuth: []
 *      responses:
 *          200:
 *              description: Job statistics retrieved successfully
 *          401:
 *              description: Unauthorized - No token provided
 */

// CREATE JOB || POST
router.post('/create-job', userAuth, createJobController)

// GET JOBS || GET
router.get('/get-job', userAuth, getAllJobsController)

// UPDATE JOBS || PUT
router.put('/update-job/:id', userAuth, updateJobController)

// DELETE JOBS || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController)

// JOBS STATS FILTER || GET
router.get('/job-stats', userAuth, jobStatsController)

export default router