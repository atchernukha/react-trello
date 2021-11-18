const { Item } =require('../models/models')
// const ApiError = require('../error/ApiError')

class  ItemController {
    async create (req, res) {
        const {name, listId} = req.body
        const types = await Item.create({itemName: name, listId})
        return res.json(types)
    }

    async update (req, res) {
        // const {id} = req.params
        try{
            const {id, name, listId} = req.body
            await Item.update(
                {id, itemName: name, listId},
                {where:{id: id}})
            res.status(200).json({message:"Updated successfully"});
           }
           catch(e){
            res.status(404).json({message:"Item not found"})
           }
    }

    async getAll (req, res) {
        const {listId} = req.query
        let items;
        if(listId){
            items = await Item.findAll({where:{listId}})
        } else {
            items = await Item.findAll()
        }
        return res.json(items)
    }

    async delete (req, res) {
        const {id} = req.params
        try{
            await Item.destroy({where:{id: id}})
            res.status(200).json({message:"Deleted successfully"});
           }
           catch(e){
            res.status(404).json({message:"Item not found"})
           }
    }
}

module.exports = new ItemController()