const { User } = require('../models')
const jwt = require('jsonwebtoken')

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
            if (!user || !(await user.comparePassword(password)) ) {
                res.locals.error = __('Invalid credentials')
                res.locals.email = email
                res.render('login')
                return
            }
            req.session.userLogged = user._id
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

    logout(req, res, next) {
        req.session.regenerate( err => {
            console.log('regenerate: ', err)
            if (err) {
                next(err)
                return
            }
            res.redirect('/')
        })
    }

    async postJWT(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user || !(await user.comparePassword(password))) {
                res.json({ error: 'InvalidCredentials' })
                return
            }
            const tokenJWT = await jwt.sign({ _id: user._id }, "adgjlqetu", {
                expiresIn: '2d'
            })
            res.json({ jwt: tokenJWT })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoginController