const {Model, DataTypes} = require('sequelize');

class ValorHora extends Model {
    static init(sequelize) {
        super.init({
            horasTrabMes: DataTypes.INTEGER,
            rendaDesejada: DataTypes.DOUBLE,
            valorHora: DataTypes.DOUBLE
        },{
            sequelize,
            tableName: 'valorHora'
        })
    }

    static associate(models) {
       
    }
}

// ValorHora.removeAttribute('id');

module.exports = ValorHora;