const errorMiddleware = (err, req, res, next) => {
    const defaultErrors = {
        statusCode: 500,
        message: err.message || "Something went wrong"
    }

    // Validation errors (missing field, invalid email, etc)
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400
        defaultErrors.message = Object.values(err.errors).map((item) => item.message).join(', ')
    }

    // duplicate error
    if (err.code && err.code === 11000) {
        defaultErrors.statusCode = 400
        defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique`
    }

    res.status(defaultErrors.statusCode).json({ success: false, message: defaultErrors.message })
}

export default errorMiddleware