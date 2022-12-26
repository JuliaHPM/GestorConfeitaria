const {Model, DataTypes} = require('sequelize');

class Ingredientes_receita extends Model {
    static init(sequelize) {
        super.init({
            quantIngrediente: DataTypes.DOUBLE,
            unidadeDeMedida: DataTypes.STRING     
        },{
            sequelize,
            tableName: 'ingredientes_receita'
        })
    }

    //relacionamentos já foram feitos nas outras tabelas..
    static associate(models) {
       
    }
}

module.exports = Ingredientes_receita;