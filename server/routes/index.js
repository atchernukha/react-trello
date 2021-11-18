const Router = require('express')

const router =new Router()
const listRouter =require('./listRouter')
const itemRouter =require('./itemRouter')

router.use('/list', listRouter)
router.use('/item', itemRouter)

module.exports =router