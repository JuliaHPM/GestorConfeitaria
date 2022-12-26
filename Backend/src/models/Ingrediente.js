const { Model, DataTypes } = require('sequelize');
const Ingredientes_receita = require('./Ingredientes_receita');

class Ingrediente extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            marca: DataTypes.STRING,
            quantEmb: DataTypes.DOUBLE,
            precoUnit: DataTypes.DOUBLE,
            precoKg: DataTypes.DOUBLE,
            unidadeDeMedida: DataTypes.STRING

        }, {
            sequelize,
            tableName: 'ingredientes'
        })
    }

    //relacionamentos
    //um ingrediente belongstoMany receitas
    static associate(models) {
        this.belongsToMany(models.Receita, { foreignKey: 'idIngrediente', through: Ingredientes_receita, as: 'receitas' });
    }
}

module.exports = Ingrediente;