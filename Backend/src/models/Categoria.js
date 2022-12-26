const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
    static init(sequelize) {
        super.init({
            nomeCategoria: DataTypes.STRING,
            imagemCategoria: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'categorias'
        })
    }

    //relacionamentos
    //uma Categoria tem varios doces (um doce pertence a uma categoria)
    static associate(models) {
        this.hasMany(models.Doce, { foreignKey: 'idCategoria', as: 'doces' });
    }
}

module.exports = Categoria;