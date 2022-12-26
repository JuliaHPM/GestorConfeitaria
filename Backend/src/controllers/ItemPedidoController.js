const Cliente = require('../models/Cliente');
// const Endereco = require('../models/Endereco');
const Carrinho = require('../models/Carrinho');
const Doce = require('../models/Doce');
const ItemPedido = require('../models/ItemPedido');
const Pedido = require('../models/Pedido');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const Receita = require('../models/Receita');
const Receitas_doce = require('../models/Receitas_doce');

module.exports = {

    //listar o item e informações do doce?
    async listOne(req, res) {
        const { idItemPedido } = req.params;
        //ver se o cliente especificado existe antes de fazer a busca?
        const item = await ItemPedido.findByPk(idItemPedido)
            // , {
            //     include: { association: 'doce' } //join com o doce
            // }
            ;
        if (!item) {
            return res.status(400).json({ error: 'Item não encontrado' });
        }

        return res.json(item);
        // return res.json(item.doce); //lista apenas informacoes do doce
    },

    async listAll(req, res) {
        await ItemPedido.findAll()
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Não foi possível encontrar itens.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Erro ao encontrar itens"
                });
            });
    },

    async maisVendidos(req, res) {
        const itens = await ItemPedido.findAll({
            attributes: [
                // "id",
                [sequelize.fn("sum", sequelize.col("quantidade")), "totalQuantity"],
            ],
            group: ["doce.id"],
            include: [{ association: 'doce', attributes: ['id', 'nomeDoce', 'valorTotalComMargem', 'descricao', 'peso', 'imagemDoce'], }],
            order: [[sequelize.col("totalQuantity"), "DESC"]],
            limit: 5,
        });

        return res.json(itens);
    },

    async docesPorPeriodo(req, res) { //doces a fazer
        const { dataInicio, dataFinal, status } = req.query;

        console.log(dataInicio, dataFinal, status)

        const query = {};

        if (status) {
            query.status = status;
        }
        if (dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.between]: [dataInicio, dataFinal]
            }
        }
        if (dataInicio && !dataFinal) {
            query.dataEntrega = {
                [Op.gte]: dataInicio //>=
            }
        }
        if (!dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.lte]: dataFinal //<=
            }
        }

        const itens = await ItemPedido.findAll({
            attributes: [
                // "id",
                [sequelize.fn("sum", sequelize.col("quantidade")), "totalQuantity"],
            ],

            include: [
                {
                    association: 'doce',
                    attributes: ['id', 'nomeDoce', 'valorTotalComMargem', 'descricao', 'peso', 'imagemDoce'],//
                    // include: [{ association: 'receitas' }]
                },
                {
                    association: 'pedido',
                    attributes: [],
                    where: query
                }

            ],
            group: ["doce.id"],// 'doce->receitas.id', 'doce->receitas->Receitas_doce.quantReceita', 'doce->receitas->Receitas_doce.unidadeDeMedida', 'doce->receitas->Receitas_doce.createdAt', 'doce->receitas->Receitas_doce.updatedAt', 'doce->receitas->Receitas_doce.idDoce', 'doce->receitas->Receitas_doce.idReceita'
            // order: [[sequelize.col("totalQuantity"), "DESC"]],
            // order: [['doce.id', "DESC"]],
            // limit: 5,
        });


        const idDoces = itens.map(item => {
            return item.doce.id
        })

        const receitas = await Receita.findAll({
            attributes: {
                include: [[sequelize.fn('sum', sequelize.col('doces->Receitas_doce.quantReceita')), "totalQuantityReceita"]]
            },
            include: [
                {
                    // model: Receitas_doce,
                    association: 'doces',
                    // attributes: ['quantReceita'],
                    attributes: {
                        // include: [[sequelize.fn('sum', sequelize.col('doces->Receitas_doce.quantReceita')), "totalQuantityReceita"]],
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        id: {
                            [Op.in]: idDoces
                        }
                    }
                }
            ],
            group: ['Receita.id', "doces.id", "doces->Receitas_doce.quantReceita", 'doces->Receitas_doce.unidadeDeMedida', 'doces->Receitas_doce.createdAt', 'doces->Receitas_doce.updatedAt', "doces->Receitas_doce.idDoce", "doces->Receitas_doce.idReceita"]

        })

        // console.log(receitas)

        return res.json(itens);
    },

    async receitasPorPeriodo(req, res) { //doces a fazer
        const { dataInicio, dataFinal, status } = req.query;

        const query = {};

        if (status) {
            query.status = status;
        }
        if (dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.between]: [dataInicio, dataFinal]
            }
        }
        if (dataInicio && !dataFinal) {
            query.dataEntrega = {
                [Op.gte]: dataInicio //>=
            }
        }
        if (!dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.lte]: dataFinal //<=
            }
        }

        const itens = await ItemPedido.findAll({
            attributes: [
                // "id",
                [sequelize.fn("sum", sequelize.col("quantidade")), "totalQuantity"],
            ],
            group: ["doce.id", 'ItemPedido.id', 'doce->receitas.id'],
            include: [
                {
                    association: 'doce',
                    attributes: ['id', 'nomeDoce', 'valorTotalComMargem', 'descricao', 'peso', 'imagemDoce'],
                    include: [{ association: 'receitas', attributes: [] }]
                },
                {
                    association: 'pedido',
                    attributes: [],
                    where: query
                }
            ],
            // order: [[sequelize.col("totalQuantity"), "DESC"]],
            // order: [['doce.id', "DESC"]],
        });
        return res.json(itens);
    },
    // async receitasPorPeriodo(req, res) { //doces a fazer
    //     const { dataInicio, dataFinal, status } = req.query;

    //     const query = {};

    //     if (status) {
    //         query.status = status;
    //     }
    //     if (dataInicio && dataFinal) {
    //         query.dataEntrega = {
    //             [Op.between]: [dataInicio, dataFinal]
    //         }
    //     }
    //     if (dataInicio && !dataFinal) {
    //         query.dataEntrega = {
    //             [Op.gte]: dataInicio //>=
    //         }
    //     }
    //     if (!dataInicio && dataFinal) {
    //         query.dataEntrega = {
    //             [Op.lte]: dataFinal //<=
    //         }
    //     }

    //     const receitas = await Doce.findAll({
    //         attributes: [
    //             // [sequelize.fn("sum", sequelize.col("receitas->Receitas_doce.quantReceita")), "totalQuantity"]
    //         ],
    //         include: [
    //             {
    //                 association: 'receitas',
    //                 // required: true,
    //                 attributes: ['id', [sequelize.fn("sum", sequelize.col("receitas->Receitas_doce.quantReceita")), "totalQuantity"]], //

    //             }, {
    //                 association: 'itensPedido',
    //                 include: [
    //                     { association: 'pedido', where: query, attributes: [] },
    //                 ],
    //                 attributes: [],
    //             }


    //         ],
    //         group: ["receitas.id", 'Doce.id'],
    //         // group: ["Receita.id", 'doces.id', 'doces->Receitas_doce.quantReceita', "doces->Receitas_doce.unidadeDeMedida", 'doces->Receitas_doce.createdAt', '"doces->Receitas_doce.updatedAt', 'doces->Receitas_doce.idDoce'],
    //         // order: [[sequelize.col("totalQuantity"), "DESC"]],
    //         // order: [['doce.id', "DESC"]],
    //     });
    //     return res.json(receitas);
    // },

    //create
    async store(req, res) {
        const { idDoce, idPedido } = req.params;
        const { quantidade, valor, valorTotal } = req.body;

        //ver se o doce existe
        const doce = await Doce.findByPk(idDoce);
        const pedido = await Pedido.findByPk(idPedido);

        if (!doce)
            return res.status(400).json({ error: 'Doce não encontrado' });

        if (!pedido)
            return res.status(400).json({ error: 'Pedido não encontrado' });

        try {
            await ItemPedido.create({
                idDoce,
                idPedido,
                quantidade,
                valor,
                valorTotal
            });
        } catch (err) {
            return res.status(400).json({ message: 'Falha ao inserir item!', error: err });
        }
        return res.status(200).json({ message: 'Item inserido com sucesso!' });
    },

    async delete(req, res) {
        const { id } = req.params;
        //ver se existe o id
        const itemExists = await ItemPedido.findByPk(id);
        // console.log(itemExists)
        if (!itemExists)
            return res.status(400).json({ message: 'Item não encontrado!' });

        await ItemPedido.destroy({
            where: {
                id: id
            }
        }).then(() => {
            return res.status(200).json({ message: `Item excluído com sucesso!` });
        }).catch(() => {
            return res.status(400).json({ message: 'Falha ao excluir item!' });
        });

    },
}