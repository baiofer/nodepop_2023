const fs = require('fs').promises

module.exports = async function deleteImage(imageToDelete) {
    try {
        await fs.unlink(`./public/images/${imageToDelete}`)
    } catch(err) {
        console.error('Something wrong happened removing the file', err)
    }
}