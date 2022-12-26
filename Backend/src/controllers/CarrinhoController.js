const Cliente = require('../models/Cliente');
// const Endereco = require('../models/Endereco');
const Pedido = require('../models/Pedido');
const Carrinho = require('../models/Carrinho');
const ItemCarrinho = require('../models/ItemCarrinho');

module.exports = {

    //listar o carrinho e informacoes de determinado cliente
    async list(req, res) {
        const { idCliente } = req.params;
        //ver se o cliente especificado existe antes de fazer a busca
        const cliente = await Cliente.findByPk(idCliente, {
            include: { association: 'carrinho' } //join com o carrinho
        });

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }

        return res.json(cliente);
        // return res.json(cliente.carrinho); //lista apenas o carrinho do cliente
    },

    //listar os itens do carrinho
    async listItens(req, res) {
        const { idCarrinho } = req.params;
        //ver se o cliente especificado existe antes de fazer a busca
        const carrinho = await Carrinho.findByPk(idCarrinho, { include: 'itens' });

        if (!carrinho) {
            return res.status(400).json({ error: 'Carrinho não encontrado' });
        }

        // const itens = carrinho.getItens();

        // console.log(await carrinho.countItens()); 

        return res.json(carrinho);
        // return res.json(carrinho.itens); //lista apenas os itens
    },

    //listar todos os carrinhos
    async listAll(req, res) {
        const carrinho = await Carrinho.findAll();

        if (!carrinho) {
            return res.status(400).json({ error: 'Nenhum carrinho encontrado' });
        }

        return res.json(carrinho);
        // return res.json(carrinho.itens); //lista apenas os itens
    },


    //create
    async store(req, res) {
        const { idCliente } = req.params;
        // const { idPedido } = req.body;

        // dar mensagem de erro se tentar adicionar mais de um carrinho
        const carrinhoexiste = await Carrinho.findAll({
            where: { idCliente }
        });

        //ver se o cliente existe
        const cliente = await Cliente.findByPk(idCliente);

        if (!cliente)
            return res.status(400).json({ error: 'Cliente não encontrado' });

        if (carrinhoexiste.length > 0)
            return res.status(400).json({ error: `Este cliente já possui um carrinho: ${carrinhoexiste}` });

        //criar um carrinho para o cliente
        const carrinho = await Carrinho.create({
            idCliente,
            // idPedido
        });

        return res.json(carrinho);
    }
}