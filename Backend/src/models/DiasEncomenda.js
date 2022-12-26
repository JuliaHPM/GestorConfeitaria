const {Model, DataTypes} = require('sequelize');

class DiasEncomenda extends Model {
    static init(sequelize) {
        super.init({
            diaSemana: DataTypes.STRING,
            quantidadePedidosDia: DataTypes.INTEGER,
            pedidosAceitos: DataTypes.INTEGER,
            quantidadeDisponivel: DataTypes.INTEGER
        },{
            sequelize,
            tableName: 'diasEncomenda'
        })
    }

    static associate(models) {
       
    }
}

module.exports = DiasEncomenda;