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

    async deleteProduct(req, res, next) {
        try {
            const userId = req.session.userLogged
            const productId = req.params.productId
            const product = await Product.findOne({ _id: productId })
            if (!product) {
                console.warn(`WARNING - el usuario ${userId} intentó eliminar un producto inexistente (${productId})`)
                next(createError(404, 'Product not found'))
                return
            }
            // agente.owner viene de la BD y es un ObjectId
            if (product.owner.toString() !== userId) {
                console.warn(`WARNING - el usuario ${userId} intentó eliminar un producto (${productId}) que no es de su propiedad. El propietario es ${product.owner}.`)
                next(createError(401, 'Unauthorized'))
                return
            }
            await Product.deleteOne({ _id: productId })
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController