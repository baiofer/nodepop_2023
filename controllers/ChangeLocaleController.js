class ChangeLocaleController {

    index(req, res, next) {
        const locale = req.params.locale
        // Poner una cookie con el nuevo idioma
        res.cookie('nodepop-locale', locale, {
            maxAge: 1000 * 60 * 60 * 24 * 30  //30 días
        })

        // Responder con una redirección a la página de la que se venia.
        res.redirect(req.get('referer'))
    }
}

module.exports = ChangeLocaleController