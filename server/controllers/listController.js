const { List } =require('../models/models')

class  ListController {
    async create (req, res) {
        const {name} = req.body
        try {
            const list = await List.create({listName: name})
            return res.status(200).json(list);
        }
        catch {
            res.status(404).json({message:"list not created"})
        }
 
    }

    async getAll (req, res) {
        try {
            const lists = await List.findAll()
            return res.json(lists)
        }
        catch {
            res.status(404).json({message:"Lists fetching error"})
        }
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