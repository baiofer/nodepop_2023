const express = require('express')
const router = express.Router()
const getTags = require('../../lib/getTags')

// GET Get tags
router.get('/', async (req, res, next) => {
    const tagsSelected = await getTags()
    res.json({ result: tagsSelected })
})

module.exports = router