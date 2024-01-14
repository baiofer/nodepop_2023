var createError = require('http-errors')
const jwt = require('jsonwebtoken')

// Módulo que exporta un middleware
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt
        
        if (!jwtToken) {
            console.log('jwtToken: ', jwtToken)
            next(createError(401, 'No token provided'))
            return
        }
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                next(createError(401, 'Invalid token'))
                return
            }
            req.userLoggedApi = payload._id
            next()
        })
        
    } catch (error) {
        next(error)
    }
}