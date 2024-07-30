//Create a router and the notes router
const router = require('express').Router()
const notesRouter = require('./db.js')
router.use('/notes', notesRouter)

//Export the router
module.exports = router