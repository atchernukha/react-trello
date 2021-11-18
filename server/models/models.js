const sequelize = require('../db')
const {DataTypes} =require('sequelize')

const List = sequelize.define('list',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    listName: {type: DataTypes.STRING, unique: true}
})

const Item = sequelize.define('item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    itemName: {type: DataTypes.STRING, unique: true}
})

List.hasMany(Item)
Item.belongsTo(List)

module.exports = {
    List,
    Item
}


