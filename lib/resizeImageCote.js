const { Requester } = require('cote')

const requester = new Requester({ name: 'nodeapp-email' })

module.exports = async function resizeImageCote(imageToResize) {
    const evento = {
        type: 'resize-image',
        image: imageToResize,
    }
    console.log('Entro')
    return new Promise(resolve => requester.send(evento, resolve))
}
