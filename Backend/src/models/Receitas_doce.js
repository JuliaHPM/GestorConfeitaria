const { Model, DataTypes } = require('sequelize');

class Receitas_doce extends Model {
    static init(sequelize) {
        super.init({
            quantReceita: DataTypes.DOUBLE,
            unidadeDeMedida: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'receitas_doce'
        })
    }

    //relacionamentos já foram feitos nas outras tabelas..
    static associate(models) {
        this.hasOne(models.Receita, { foreignKey: 'idReceita', as: 'receita' });
        this.hasOne(models.Doce, { foreignKey: 'idDoce', as: 'doce' });
    }
}

module.exports = Receitas_doce;