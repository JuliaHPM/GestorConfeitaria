const { query } = require('express');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const Carrinho = require('../models/Carrinho');
const Cliente = require('../models/Cliente');
const Doce = require('../models/Doce');
const ItemCarrinho = require('../models/ItemCarrinho');
const ItemPedido = require('../models/ItemPedido');
// const Endereco = require('../models/Endereco');
const Pedido = require('../models/Pedido');

module.exports = {

    //listar os pedidos e informacoes de determinado cliente
    async list(req, res) {
        const { idCliente } = req.params;
        //ver se o cliente especificado existe antes de fazer a busca
        const cliente = await Cliente.findByPk(idCliente, {
            attributes: [],
            include: [{
                // model: Pedido,
                association: 'pedidos',
                include: [{
                    association: 'itensPedido',
                    include: [{
                        association: 'doce',
                        attributes: ['id', 'nomeDoce', 'imagemDoce']
                    }]
                }, {
                    association: 'endereco'
                }],
            }],
            order: [["pedidos", 'dataEntrega', 'DESC']]
        });

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }

        return res.json(cliente.pedidos);
        // return res.json(cliente.pedidos); //lista apenas os pedidos do cliente
    },

    async findOne(req, res) {
        const { idPedido } = req.params;

        try {
            const pedido = await Pedido.findByPk(idPedido, {
                include: [
                    { association: 'itensPedido', include: { association: 'doce', attributes: ['id', 'nomeDoce', 'imagemDoce'] } },
                    { association: 'endereco' },
                ]
            })

            return res.status(200).json(pedido)
        } catch (err) {
            return res.status(400).json({ message: "Erro ao encontrar pedido", error: err });
        }
    },

    //query count
    async getPedidosPorStatus(req, res) {
        const { status } = req.query;

        const query = {};

        if (status) {
            query.status = status;
        }

        const pedidos = await Pedido.count({
            where: query
        })

        return res.json(pedidos)
    },

    async getPedidosFiltered(req, res) {
        const { idPedido, nomeCliente, status, campoOrdem, ordem, pago, tipoEntrega, dataInicio, dataFinal } = req.query;

        // console.log(dataInicio);
        // const datainicio = ''
        // const datafinal = '2022-11-29'

        // const campoOrdenacao = 'createdAt';
        // const ordenacao = 'DESC';

        var query = {};
        var queryCliente = {};

        if (idPedido) {
            query.id = {
                [Op.eq]: idPedido
            }
        }
        if (nomeCliente) {
            queryCliente.nome = {
                [Op.iLike]: `%${nomeCliente}%`
            }
        }
        if (status) {
            query.status = {
                [Op.iLike]: status
            }
        }
        if (pago) {
            query.pago = {
                [Op.is]: JSON.parse(pago)
            }
        }
        if (tipoEntrega) {
            query.tipoEntrega = {
                [Op.iLike]: tipoEntrega
            }
        }
        if (dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.between]: [dataInicio, dataFinal]
            }
        }
        if (dataInicio && !dataFinal) {
            query.dataEntrega = {
                [Op.gte]: dataInicio
            }
        }
        if (!dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.lte]: dataFinal
            }
        }

        const pedidos = await Pedido.findAll({
            // attributes: ['id', 'nomeDoce', 'descricao', 'valorTotalComMargem', 'imagemDoce', 'peso'],
            include: [
                {
                    association: 'itensPedido',
                    include: {
                        association: 'doce',
                        attributes: ['id', 'nomeDoce', 'imagemDoce']
                    }
                },
                {
                    association: 'endereco'
                },
                {
                    association: 'cliente',
                    attributes: ['id', 'nome', 'telefone'],
                    where: queryCliente
                }
            ],
            where: query,
            order: [[campoOrdem, ordem]]
        });

        return res.json(pedidos);
    },

    async vendasPeriodo(req, res) {

        const { dataInicio, dataFinal } = req.query;

        const query = {};

        query.status = {
            [Op.iLike]: "finalizado"
        }

        if (dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.between]: [dataInicio, dataFinal]
            }
        }
        if (dataInicio && !dataFinal) {
            query.dataEntrega = {
                [Op.gte]: dataInicio
            }
        }
        if (!dataInicio && dataFinal) {
            query.dataEntrega = {
                [Op.lte]: dataFinal
            }
        }

        try {
            const pedidos = await Pedido.findAll({
                attributes: ['dataEntrega', [sequelize.fn("COUNT", sequelize.col("id")), "pedidosCount"]],
                group: ['dataEntrega'],
                order: ['dataEntrega'],
                where: query
            })

            // const totalPedidos = pedidos.length;"totalPedidos": totalPedidos, 

            return res.status(200).json(pedidos)

        } catch (err) {
            return res.status(400).json({ message: "Erro ao consultar vendas por periodo", erro: err })
        }
    },

    async store(req, res) {
        const { idCliente } = req.params;
        const { idEnderecoEntrega } = req.body;

        if (idEnderecoEntrega) { //ver se existe o endereco
            var cliente = await Cliente.findByPk(idCliente, {
                include: [{
                    association: 'enderecos',
                    where: { id: idEnderecoEntrega }
                },
                {
                    association: 'carrinho',
                    // where: { id: idCarrinho },
                    include: [{ association: 'itens', }]
                }
                ]
            });
        } else {
            cliente = await Cliente.findByPk(idCliente, {
                include: [
                    {
                        association: 'carrinho',
                        // where: { id: idCarrinho },
                        include: [{ association: 'itens', }]
                    }
                ]
            });
        }

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente, endereço ou carrinho não encontrados' });
        }

        const itensCarrinho = cliente.carrinho.itens;

        try {

            const pedido = await Pedido.create({
                idCliente,
                idEnderecoEntrega,
                ...req.body
            });

            itensCarrinho.map(async (item) => {
                // console.log('item: ', item)
                const doceExists = await Doce.findByPk(item.idDoce);
                if (!doceExists) {
                    return res.status(400).json({ message: 'Doce nao encontrado' })
                }

                await ItemPedido.create({
                    // ...item,
                    idPedido: pedido.dataValues.id,
                    idDoce: item.idDoce,
                    quantidade: item.quantidadeItem,
                    valor: item.valorItem,
                    valorTotal: item.valorTotalItem,
                });

                //excluir itens do carrinho
                await ItemCarrinho.destroy({
                    where: {
                        id: item.id
                    }
                });

            })
            return res.status(200).json({ message: 'Pedido salvo com sucesso!', idPedido: pedido.dataValues.id });


        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: 'Erro ao salvar pedido', error: err });
        }
    },

    async updateStatus(req, res) {
        const { idPedido } = req.params;
        const { status } = req.body;

        const pedido = await Pedido.findByPk(idPedido);
        if (!pedido) {
            return res.status(400).json({ error: 'Pedido não encontrado' });
        }

        try {
            await Pedido.update(
                { status },
                {
                    where: { id: idPedido }
                })
            return res.status(200).json({ message: 'Status alterado com sucesso!' });
        } catch (err) {
            return res.status(400).json({ message: "Erro ao alterar status do pedido", error: err });
        }
    },

    async updatePagamento(req, res) {
        const { idPedido } = req.params;
        const { pago } = req.body;

        const pedido = await Pedido.findByPk(idPedido);
        if (!pedido) {
            return res.status(400).json({ error: 'Pedido não encontrado' });
        }

        try {
            await Pedido.update(
                {
                    pago
                },
                {
                    where: { id: idPedido }
                })
            return res.status(200).json({ message: 'Pagamento alterado com sucesso!' });
        } catch (err) {
            return res.status(400).json({ message: "Erro ao alterar pagamento do pedido", error: err });
        }
    },

    async update(req, res) {
        const { idPedido } = req.params;
        const { idEnderecoEntrega, idCliente, itensPedido } = req.body;

        if (idEnderecoEntrega && idCliente) {
            var cliente = await Cliente.findByPk(req.userId, {
                include: {
                    association: 'enderecos',
                    where: { id: idEnderecoEntrega }
                } //join com os enderecos e idEndereco
            });
        } else if (idCliente) {
            cliente = await Cliente.findByPk(idCliente);
        }

        if (idCliente && !cliente) {
            return res.status(400).json({ message: 'Cliente ou endereço não encontrado' });
        }

        try {
            await Pedido.update(req.body, {
                where: { id: idPedido }
            });

            // if (itensPedido) {

            // }
            return res.status(200).json({ message: 'Pedido alterado com sucesso!' });
        } catch (err) {
            return res.status(400).json({ message: 'Erro ao alterar pedido', erro: err });
        }

    },

    async delete(req, res) {
        const { idPedido } = req.params;

        const pedido = await Pedido.findByPk(idPedido);
        if (!pedido) {
            return res.status(400).json({ message: 'Pedido nao encontrado' })
        }

        try {
            await Pedido.destroy({ where: { id: idPedido } });

            return res.status(200).json({ message: 'Pedido excluido com sucesso!' });

        } catch (err) {
            return res.status(400).json({ message: "Erro ao excluir pedido", error: err })
        }


    }
}