const queryFilter = require('../lib/queryFilter');
const createError = require('http-errors')
const { User } = require('../models')

class ProductsController {

    async index(req, res, next) {
        console.log('Products: ', req.session)
        try {
            // If there isn't a session
            if (!req.session.userLogged) {
                // Get all products in DB
                const { products, error } = await queryFilter(req)
                if (Object.keys(error).length !== 0) {
                    next(error)
                    return
                }
                res.locals.products = products
                res.render('index')
            } else {
                // If there is a session, get only products from user
                const userId = req.session.userLogged
                console.log(userId)
                const user = await User.findById(userId)
                if (!user) {
                    next(createError(500, 'User not found'))
                    return
                }
                const { products, error } = await queryFilter(req)
                if (Object.keys(error).length !== 0) {
                    next(error)
                    return
                }
                res.locals.products = products
                res.render('products', { email: user.email })
            }
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ProductsController