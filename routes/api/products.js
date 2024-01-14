const express = require('express')
const router = express.Router()
const queryFilter = require('../../lib/queryFilter')
const Product = require('../../models/Product')
const upload = require('../../lib/uploadConfigure')

// GET Get products
router.get('/', async (req, res, next) => {
    try {
        const { products, error } = await queryFilter(req)
        if (Object.keys(error).length !== 0) {
          next(error)
        }
        res.json({ results: products })
    
    } catch (err) {
        next(err)
    }
})

// PUT Update a product
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const actualizedProduct = await Product.findByIdAndUpdate(id, data,{})
        res.json({ result: actualizedProduct })
    } catch (err) {
        next(err)
    }
})

// POST Create a product
router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        const productData = req.body
        const product = new Product(productData)  // Create a product
        product.image = req.file.filename         // Add image filename
        product.owner = req.userLoggedApi         // Add owner of the Ad
        console.log('product: ', product)
        const savedProduct = await product.save()       // Persist product in DB
        console.log('product: ', product)
        res.json({ result: savedProduct})
    } catch (err) {
        next(err)
    }
})

// DELETE Delete a product
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await Product.deleteOne({ _id: id })
        res.json()
    } catch (err) {
        next(err)
    }
})

module.exports = router