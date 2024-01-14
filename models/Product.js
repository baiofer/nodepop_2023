const mongoose = require('mongoose')


// Product schema definition
const productSchema = mongoose.Schema({
    name: { type: String, index: true },
    sale: { type: Boolean, index: true },
    price: { type: Number, index: true },
    image: { type: String },
    tags: { type: [String], index: true},
    owner: { ref: 'User', type: mongoose.Schema.Types.ObjectId }
}, {
    collection: 'products'
})

// Products list
productSchema.statics.list = function (filter, skip, limit, sort, fields) {
    const query = Product.find(filter)
    query.skip(skip)
    query.limit(limit)
    query.sort(sort)
    query.select(fields)
    return query.exec()
}

// Create product model
const Product = mongoose.model('Product', productSchema)

// Procuct model export
module.exports = Product