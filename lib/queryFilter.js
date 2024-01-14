const Product = require('../models/Product');

module.exports = async function queryFilter(req) {
    let error = {}
    // Get filters from query
    const userIdLogged = req.userLoggedApi
    const filterByName = req.query.name
    const filterBySale = req.query.sale
    const filterByPrice = req.query.price
    const filterByTag = req.query.tag
  
    const skip = req.query.skip
    const limit = req.query.limit
  
    const sort = req.query.sort
  
    const fields = req.query.fields
  
    // Test filters
    const filter = {}
    if (filterByName) {
        filter.name = new RegExp(filterByName, "ui")
    }
  
    if (filterBySale) {
        filter.sale = filterBySale
    }
  
    if (filterByPrice) {
        // Get prices from the string
        const rangoPrecio = filterByPrice.split("-");
        if ((parseInt(rangoPrecio[0]) > 0 || (rangoPrecio[0] === ''))&& (parseInt(rangoPrecio[1]) > 0 || rangoPrecio[1] === '')) {
            if (rangoPrecio[0] === '') {
                filter.price = {$lt:parseInt(rangoPrecio[1])};
            } else if (rangoPrecio[1] === '') {
                filter.price = {$gte:parseInt(rangoPrecio[0])};
            } else {
                filter.price = {$lt:parseInt(rangoPrecio[1]), $gte:parseInt(rangoPrecio[0])};
            }
        } else {
          error = createError(__('Rango de precios mal indicado. (x-y, -y, x-)'), 409)
        }
    }
  
    if (filterByTag) {
        filter.tags = { $elemMatch: { $eq: filterByTag } }
    }

    // If jwt in request, send only products of the userLogged
    if (userIdLogged) {
        filter.owner = userIdLogged
    }
    
  
    // Search with filters
    const products = await Product.list(filter, skip, limit, sort, fields)
    return { products, error }
}

function createError (text, status) {
    err = new Error()
    err.status = status
    err.message = text
    return err
  }