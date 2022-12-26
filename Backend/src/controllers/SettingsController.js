const Endereco = require('../models/Endereco');
const Settings = require('../models/Settings');

module.exports = {
    //listar todos os ingredientes
    async list(req, res) {
        const settings = await Settings.findAll({
            attributes:
                ["id", "valorKm", "enderecoOrigem", 'telefoneConfeitaria', 'taxaEntrega']

            // include: [{
            //     model: Endereco,
            //     as: 'endereco',
            //     // attributes: ['id', 'nome', 'marca'],
            // }]
        });
        if (!settings || settings === null) {
            return res.status(400).json({ message: 'Nenhuma setting cadastrada!' });
        }
        return res.json(settings);
    },

    async findOne(req, res) {
        const { id } = req.params;

        await Settings.findByPk(id, {
            attributes:
                ["id", "valorKm", "enderecoOrigem", 'telefoneConfeitaria', 'taxaEntrega']
        })
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Não foi possível encontrar a setting id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Erro ao encontrar setting com id=" + id
                });
            });
    },

    //create
    async create(req, res) {
        // const { valorKm, enderecoOrigem } = req.body;

        // const enderecoExists = await Endereco.findByPk(idEnderecoOrigem);
        // if (!enderecoExists || enderecoExists === null) {
        //     return res.status(400).json({ message: 'Endereço não encontrado' });
        // }

        try {
            await Settings.create({
                valorKm: req.body.valorKm,
                enderecoOrigem: req.body.enderecoOrigem,
                telefoneConfeitaria: req.body.telefoneConfeitaria
            }

            );
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Erro ao salvar settings', erro: err })
        }

        return res.status(200).json({ message: 'Settings cadastrada!' });
    },

    //atualizar
    async updateFrete(req, res) {
        const { id } = req.params;
        try {
            await Settings.update({
                valorKm: req.body.valorKm,
                enderecoOrigem: req.body.enderecoOrigem,
                taxaEntrega: req.body.taxaEntrega
            }, {
                where: { id: id }
            })

            return res.status(200).json({ message: `Settings editada com sucesso!` });
        } catch (err) {
            return res.status(400).json({ message: 'Falha ao editar Settings!' });
        }
    },

    //excluir
    async delete(req, res) {
        const { id } = req.params;

        //ver se existe o id
        const settingsExists = await Settings.findByPk(id);
        if (!settingsExists)
            return res.status(400).json({ message: 'Settings não encontrada!' });

        await Settings.destroy({
            where: {
                id: id
            }
        }).then(() => {
            return res.status(200).json({ message: `Settings excluido com sucesso!` });
        }).catch((err) => {
            return res.status(400).json({ message: 'Falha ao excluir Settings!' });
        });

    },
}