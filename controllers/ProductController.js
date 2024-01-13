const Product = require ('../models/Product.js')
const getTags = require('../lib/getTags')

class ProductController {
    async new (req, res, next) {
        const tagsSelected = await getTags()
        res.locals.tags = tagsSelected 
        res.render("newProduct")
    }

    async postNewProduct(req, res, next) {
        try {
            const userId = req.session.userLogged
            const { name, price, type, tags, image } = req.body
            const product = new Product({
                name,
                price,
                sale: type === "sale" ? true : false,
                tags,
                image,
                owner: userId
            })
            console.log(product)
            await product.save()
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController