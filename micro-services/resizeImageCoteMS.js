'use strict'

const { Responder } = require('cote')
const jimp = require('jimp');
const path = require('node:path')

main().catch(err => console.log('Hubo un error ', err))
async function main() {
    console.log('microservicio')
    try {
        const responder = new Responder({ name: 'resice images' })
        responder.on('resize-image', async (req, done) => {
            const { image } = req
            const imageToResize = await jimp.read(`./public/images/${image}`)
            //await imageToResize.resize(300, 250)
            await imageToResize.resize(100, 100)
            const imageResized = await imageToResize.writeAsync(`./public/images/${image}`)
            console.log('Immage changed: ', image)
            done(imageResized)
        })
    } catch (error) {
        done({ message: err.message })
    }
}