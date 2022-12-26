const { Model } = require('sequelize');

class Carrinho extends Model {
    static init(sequelize) {
        super.init({

        }, {
            sequelize,
            tableName: 'carrinho'
        })
    }

    //relacionamentos
    //um carrinho tem um cliente
    //um carrinho pertence a um pedido
    //um carrinho tem vários itens
    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'idCliente', as: 'cliente' });
        // this.hasOne(models.Pedido, { foreignKey: 'idCarrinho', as: 'pedido' }); //id do carrinho é chave extrangeira?
        this.hasMany(models.ItemCarrinho, { foreignKey: 'idCarrinho', as: 'itens' });
    }
}

module.exports = Carrinho;