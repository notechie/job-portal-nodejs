// API Documentation
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'

// packages imports
// const express  = require('express'); -- common js
import express from 'express'; // -- ES module
import 'express-async-errors'
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// security packages
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

// files imports
import connectDB from './config/db.js';

// routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

// dotenv config
dotenv.config()

// mongodb connection
connectDB()

// Swagger api config
// swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node Expressjs Job Portal Application"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
    apis: ['./routes/*.js']
}

const spec = swaggerDoc(options)

// rest object
const app = express();

// middlewares
app.use(helmet())
app.use(mongoSanitize())
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/job', jobRoutes)

// homeroute root
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(spec))


//validation middleware
app.use(errorMiddleware)

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
    console.log(`Node Server Running on port ${PORT}`)
});