const { User } = require('../models')

class LoginController {

    index(req, res, next) {
        res.locals.error = ''
        res.locals.email = ''
        res.render('login')
    }

    async post(req, res, next) {
        try {
            const { email, password } = req.body
            // Look for user in DB
            const user = await User.findOne({ email })
            if (!user || user.password !== password ) {
                res.locals.error = 'Invalid credentials'
                res.locals.email = email
                res.render('login')
                return
            }
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoginController