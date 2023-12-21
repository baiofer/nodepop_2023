const connection = require('../lib/connectMongoose')
const readline = require('node:readline')
const { Product, User } = require('../models')
const initData = require('./initDB-data.json')

main().catch( err => console.log('Hubo un error', err))

async function main() {
    // Wait until DB connection
    await new Promise( resolve => connection.once('open', resolve))
    
    // Confirmation message
    const deleteQuestion = await question('¿Estas seguro de que quieres borrar la base de datos y cargar datos iniciales? (si/no)  ')
    if (!deleteQuestion) { process.exit()}

    // Init users
    await initUsers()
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

async function initUsers() {
    // Delete all users
    const deleted = await User.deleteMany()
    console.log(`Eliminados ${deleted.deletedCount} usuarios.`)

    // Insert initial users
    const inserted = await User.insertMany([
        { email: "user@example.com", password: await User.hashPassword("1234") },
        { email: "admin@example.com", password: await User.hashPassword("1234") }
    ])
    console.log(`Creados ${inserted.length} usuarios.`)
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