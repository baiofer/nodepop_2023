const connection = require('../lib/connectMongoose')
const readline = require('node:readline')
const Product = require('../models/Product')
const initData = require('./initDB-data.json')

main().catch( err => console.log('Hubo un error', err))

async function main() {
    // Wait until DB connection
    await new Promise( resolve => connection.once('open', resolve))
    
    // Confirmation message
    const deleteQuestion = await question('¿Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?  ')
    if (!deleteQuestion) { process.exit()}

    // Init products
    await initProducts()
    connection.close()
}

async function initProducts() {
    // Delete all products
    const deleted = await Product.deleteMany()
    console.log(`Eliminados ${deleted.deletedCount} productos.`)

    // Insert initial products
    const inserted = await Product.insertMany(initData.products)
    console.log(`Creados ${inserted.length} productos.`)
}

function question(text) {
    return new Promise( (resolve, reject) => {
        // Connect readline with the console.
        const interf = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        interf.question(text, response => {
            interf.close()
            resolve(response.toLowerCase() === 'si')
        })
    })
}