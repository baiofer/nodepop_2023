const jimp = require('jimp');
const path = require('node:path')

module.exports = async function resizeImage(imageToResize) {
    const image = await jimp.read(`./public/images/${imageToResize}`)
    await image.resize(300, 250)
    const imageResized = await image.writeAsync(`./public/images/${imageToResize}`)
    return imageResized
}