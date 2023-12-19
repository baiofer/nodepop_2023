const getTags = require('../lib/getTags')

class TagsController {
    async index(req, res, next) {
        const tagsSelected = await getTags()
        res.locals.tags = tagsSelected 
        res.render('tags')
    }
}

module.exports = TagsController