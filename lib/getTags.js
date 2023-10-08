const Product = require('../models/Product');

module.exports = async function getTags(req) {
    const products = await Product.list()
    tagsSelected = []
    products.forEach( product => {
        product.tags.forEach( tag => {
            if (!tagsSelected.includes(tag)) {
                tagsSelected.push(tag)
            }
        })
    })
    return tagsSelected
}