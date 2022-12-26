const { Model, DataTypes } = require('sequelize');
const Ingredientes_receita = require('./Ingredientes_receita');
const Receitas_doce = require('./Receitas_doce');

class Receita extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            tempoPreparo: DataTypes.TIME,
            rendimento: DataTypes.DOUBLE,
            custo: DataTypes.DOUBLE,
            anotacoes: DataTypes.STRING,
            modoPreparo: DataTypes.STRING,
            tipoReceita: DataTypes.STRING,
            unidadeDeMedida: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'receitas'
        })
    }

    //relacionamentos
    //uma receita belongstoMany receitas doce
    static associate(models) {
        this.belongsToMany(models.Doce, { foreignKey: 'idReceita', through: Receitas_doce, as: 'doces' });
        this.belongsToMany(models.Ingrediente, { foreignKey: 'idReceita', through: Ingredientes_receita, as: 'ingredientes' });

    }
}

module.exports = Receita;