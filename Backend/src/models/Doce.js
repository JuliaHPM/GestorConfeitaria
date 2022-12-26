const { Model, DataTypes } = require('sequelize');
const Receitas_doce = require('./Receitas_doce');

class Doce extends Model {
    static init(sequelize) {
        super.init({
            nomeDoce: DataTypes.STRING,
            valorTotalReceitas: DataTypes.DOUBLE,
            horasTrab: DataTypes.TIME,
            maoDeObra: DataTypes.DOUBLE,
            valorEmbalagem: DataTypes.DOUBLE,
            totalCustoProducao: DataTypes.DOUBLE,
            margemLucro: DataTypes.DOUBLE,
            disponivel: DataTypes.BOOLEAN,
            valorTotalComMargem: DataTypes.DOUBLE,
            anotacoes: DataTypes.STRING,
            peso: DataTypes.DOUBLE, //g
            porcoes: DataTypes.INTEGER,
            valorPorcao: DataTypes.DOUBLE,
            custosFixos: DataTypes.DOUBLE,
            descricao: DataTypes.STRING,
            imagemDoce: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'doces'
        })
    }

    //relacionamentos
    //um doce pertence a uma categoria
    //um doce 'tem muitos'  itensCarrinho
    //um doce 'tem muitos'  itensPedido
    //um doce pertence a muitas receitas

    //um doce tem muitas imagens
    //um doce tem muitos adicionais
    static associate(models) {
        this.belongsTo(models.Categoria, { foreignKey: 'idCategoria', as: 'categoria' });
        this.hasMany(models.ItemCarrinho, { foreignKey: 'idCarrinho', as: 'itens' });
        this.hasMany(models.ItemPedido, { foreignKey: 'idPedido', as: 'itensPedido' });
        this.belongsToMany(models.Receita, { foreignKey: 'idDoce', through: Receitas_doce, as: 'receitas' });

    }
}

module.exports = Doce;