import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'
import { rateLimit } from 'express-rate-limit'

// ip limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

// router object
const router = express.Router()


// routes

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The Auto-generated id of user collection
 *              name:
 *                  type: string
 *                  description: User name
 *              lastName:
 *                  type: string
 *                  description: User Last Name
 *              email:
 *                  type: string
 *                  description: User Email Address
 *              password:
 *                  type: string
 *                  description: User password should be greater than 6 characters
 *              location:
 *                  type: string
 *                  description: User location (city or country)
 *          example:
 *              id: 67c3efb3a4b834639c82b0
 *              name: John
 *              lastName: Doe
 *              email: johndoe@gmail.com
 *              password: $2b$10$V4dm1vrHFS1IiJ3SDe.RJdCMkBuDEdoF7umfnak25jWydgw
 *              location: Mumbai
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Register:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: User name
 *              lastName:
 *                  type: string
 *                  description: User Last Name
 *              email:
 *                  type: string
 *                  description: User Email Address
 *              password:
 *                  type: string
 *                  description: User password should be greater than 6 characters
 *              location:
 *                  type: string
 *                  description: User location (city or country)
 *          example:
 *              name: John
 *              lastName: Doe
 *              email: johndoe@gmail.com
 *              password: test@123
 *              location: Mumbai
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: User Email Address
 *              password:
 *                  type: string
 *                  description: User password
 *          example:
 *              email: johndoe@gmail.com
 *              password: test@123
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *      responses:
 *          200:
 *              description: user created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Invalid credentials
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *      summary: login page
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: login successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *                              token:
 *                                  type: string
 *                                  description: JWT authentication token
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *          400:
 *              description: Bad request - Missing required fields
 *          500:
 *              description: something went wrong
 */

// Register || Post
router.post('/register', limiter, registerController)
// Login || Post
router.post('/login', limiter, loginController)

// export
export default router