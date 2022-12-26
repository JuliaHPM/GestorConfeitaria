const Cliente = require('../models/Cliente');
const Endereco = require('../models/Endereco')

module.exports = {
    //listar os enderecos e informacoes de determinado cliente
    async list(req, res) {
        const { idCliente } = req.params;
        //ver se o cliente especificado existe antes de fazer a busca
        const enderecos = await Endereco.findAll(
            {
                where: { idCliente }
            }
        );

        // if (!enderecos) {
        //     return res.status(400).json({ error: 'Cliente não encontrado' });
        // }

        return res.json(enderecos);
        // return res.json(cliente.enderecos); //lista apenas os enderecos do cliente

    },

    async findOne(req, res) {
        const { idEndereco } = req.params;

        await Endereco.findByPk(idEndereco, {
            // attributes: ['id', 'nome'],
            //   include: [{
            //       model: Receita,
            //       as: 'receitas',
            //       // attributes: ['id', 'nome', 'marca'],
            //   }]
        })
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Não foi possível encontrar endereco id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Erro ao encontrar endereco com id=" + id
                });
            });
    },

    //create
    async store(req, res) {
        const { idCliente } = req.params;
        const dataEndereco = req.body;

        //ver se o cliente especificado existe antes de criar o endereco com seu id
        const cliente = await Cliente.findByPk(idCliente);

        if (!cliente) {
            return res.status(400).json({ message: 'Cliente não encontrado' });
        }

        const endereco = await Endereco.create({
            idCliente,
            ...dataEndereco
        });

        return res.json(endereco);
    },

    async update(req, res) {
        const { idCliente, idEndereco } = req.params;
        const dataEndereco = req.body;

        //ver se o cliente especificado existe antes de criar o endereco com seu id
        const cliente = await Cliente.findByPk(idCliente);

        if (!cliente) {
            return res.status(400).json({ message: 'Cliente não encontrado' });
        }

        try {
            await Endereco.update({
                idCliente,
                ...dataEndereco
            }, {
                where: {
                    id: idEndereco
                }
            })

        } catch (err) {
            return res.status(400).json({ message: "Erro ao alterar endereço!" })
        };

        return res.status(200).json({ message: "Endereço alterado com successo!" });

    },

    async delete(req, res) {
        const { idCliente, idEndereco } = req.params;
        //ver se existe o id
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente)
            return res.status(400).json({ message: 'Cliente não encontrado' });

        const endereco = await Endereco.findByPk(idEndereco);
        if (!endereco)
            return res.status(400).json({ message: 'Endereco não encontrado' });

        await Endereco.destroy({
            where: {
                id: idEndereco
            }
        }).then(() => {
            return res.status(200).json({ message: `Endereço excluído com sucesso!` });
        }).catch(() => {
            return res.status(400).json({ message: 'Falha ao excluir endereço!' });
        });
    },

}