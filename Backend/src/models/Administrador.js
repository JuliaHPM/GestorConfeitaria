const {Model, DataTypes} = require('sequelize');

class Administrador extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING
        },{
            sequelize,
            tableName: 'administradores'
        })
    }

    static associate(models) {
       
    }
}

module.exports = Administrador;