const DiasEncomenda = require('../models/DiasEncomenda')

module.exports = {

    async list(req, res) {
        const diasEncomenda = await DiasEncomenda.findAll();
        return res.json(diasEncomenda);
    },

    async store(req, res) {
        const { diaSemana, quantidadePedidosDia, pedidosAceitos, quantidadeDisponivel} = req.body;

        const diasEncomenda = await DiasEncomenda.create({
            diaSemana, 
            quantidadePedidosDia, 
            pedidosAceitos, 
            quantidadeDisponivel

        }).then((res) => {
            return res.status(200).json({ message: 'Dias Encomenda cadastrado com sucesso!' });
        }).catch(() => {
            return res.status(400).json({ error: 'Falha ao cadastrar Dias Encomenda!' });
        });

        // return res.json(diasEncomenda);
    }
}