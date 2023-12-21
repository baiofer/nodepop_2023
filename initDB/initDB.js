require('dotenv').config()

const connection = require('../lib/connectMongoose')
const readline = require('node:readline')
const { Product, User } = require('../models')

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

    const [ adminUser, userUser ] = await Promise.all([
  	    User.findOne({ email: 'admin@example.com' }),
  	    User.findOne({ email: 'user@example.com' })
    ])

    // Insert initial products
    const inserted = await Product.insertMany([
        { "name": "Máquina de escribir", "sale": true, "price": 125, "image": "maquina_escribir.jpeg", "tags": ["work"], owner: adminUser._id },
        { "name": "Máquina de fotos instantánea", "sale": true, "price": 95, "image": "maquina_fotos.jpeg", "tags": ["work"], owner: userUser._id },
        { "name": "Medidor de tensión portátil", "sale": true, "price": 150, "image": "medidor_tensión.jpeg", "tags": ["lifestyle"], owner: adminUser._id },
        { "name": "Motocicleta", "sale": true, "price": 3500, "image": "moto.jpeg", "tags": ["motor"], owner: adminUser._id },
        { "name": "Reloj de cocina", "sale": true, "price": 30, "image": "reloj_de_pared.jpeg", "tags": ["lifestyle"], owner: userUser._id },
        { "name": "Silla", "sale": true, "price": 275, "image": "silla.jpeg", "tags": ["lifestyle"], owner: userUser._id },
        { "name": "iPhone 12", "sale": false, "price": 550, "tags": ["mobile"], owner: userUser._id },
        { "name": "iWatch", "sale": false, "price": 225, "tags": ["mobile"], owner: adminUser._id }
    ])
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