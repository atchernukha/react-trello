const { List } =require('../models/models')
// const ApiError = require('../error/ApiError')

class  ListController {
    async create (req, res) {
        const {name} = req.body
        const list = await List.create({listName: name})
        return res.status(200).json({message:"Created successfully"});
    }

    async getAll (req, res) {
        const lists = await List.findAll()
        return res.json(lists)
    }

    async getOne (req, res) {
        const {id} = req.params
        const list = await List.findAll({where:{id: id}})
        return res.json(list)
    }

    async delete (req, res) {
        const {id} = req.params
        try{
            await List.destroy({where:{id: id}})
            res.status(200).json({message:"Deleted successfully"});
           }
           catch(e){
            res.status(404).json({message:"list not found"})
           }
    }
}

module.exports = new ListController()