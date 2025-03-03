import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { updateUserController } from '../controllers/UserController.js'

// router object
const router = express.Router()

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *      UpdateUser:
 *          type: object
 *          required:
 *              - name
 *              - lastName
 *              - email
 *              - location
 *          properties:
 *              name:
 *                  type: string
 *                  description: User's first name
 *              lastName:
 *                  type: string
 *                  description: User's last name
 *              email:
 *                  type: string
 *                  description: User's email address
 *              location:
 *                  type: string
 *                  description: User's location (city or country)
 *          example:
 *              name: John
 *              lastName: Doe
 *              email: johndoe@gmail.com
 *              location: Mumbai
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User User Profile Management APIs
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *  put:
 *      summary: Update user profile
 *      tags: [User]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses:
 *          200:
 *              description: User profile updated successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad request - Missing required fields
 *          401:
 *              description: Unauthorized - Invalid token
 *          500:
 *              description: Internal server error
 */


// UPDATE USER || PUT
router.put('/update-user', userAuth, updateUserController)

export default router;