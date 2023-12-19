const queryFilter = require('../lib/queryFilter');

class ProductsController {

    async index(req, res, next) {
        try {
            const { products, error } = await queryFilter(req)
            console.log('products: ', products)
            if (Object.keys(error).length !== 0) {
              next(error)
            }
            
            res.locals.products = products
            res.render('index')
        
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = ProductsController