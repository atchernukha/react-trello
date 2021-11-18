const Router = require('express')
const listController = require('../controlers/listControler')

const router =new Router()

router.post('/', listController.create)
router.get('/', listController.getAll)
router.get('/:id', listController.getOne)
router.delete('/:id', listController.delete)


module.exports =router