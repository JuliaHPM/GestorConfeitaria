const Ingrediente = require('../models/Ingrediente');

module.exports = {
    //listar todos os ingredientes
    async list(req, res) {
        const ingredientes = await Ingrediente.findAll();
        if (!ingredientes || ingredientes === null) {
            return res.status(400).json({ message: 'Nenhum ingrediente cadastrado!' });
        }
        return res.json(ingredientes);
    },

    async findOne(req, res) {
        const { id } = req.params;
        await Ingrediente.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Não foi possível encontrar o ingrediente id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Erro ao encontrar ingrediente com id=" + id
                });
            });
    },

    //create
    async store(req, res) {
        const { nome, marca, quantEmb, precoUnit, precoKg, unidadeDeMedida } = req.body;

        const [ingrediente, created] = await Ingrediente.findOrCreate({ //created: true se criou agora e false se já existe
            where: { nome, marca, quantEmb },
            defaults: {
                precoUnit,
                precoKg,
                unidadeDeMedida
            }
        });

        if (created) {
            return res.status(200).json({ message: 'Ingrediente cadastrado!' });
            // return res.json(ingrediente);
        } else {
            return res.status(400).json({ message: 'Já existe um ingrediente com esse nome, marca e quantidade!' });
        }
    },

    //atualizar
    async update(req, res) {
        const { id } = req.params;

        //ver se existe o id
        const ingredienteExists = await Ingrediente.findByPk(id);
        if (!ingredienteExists)
            return res.status(400).json({ message: 'Ingrediente não encontrado!' });

        await Ingrediente.update(req.body, {
            where: { id: id }
        }).then(() => {
            return res.status(200).json({ message: `Ingrediente editado com sucesso!` });
        }).catch(() => {
            return res.status(400).json({ message: 'Falha ao editar Ingrediente!' });
        });
    },

    //excluir
    async delete(req, res) {
        const { id } = req.params;

        //ver se existe o id
        const ingredienteExists = await Ingrediente.findByPk(id);
        if (!ingredienteExists)
            return res.status(400).json({ message: 'Ingrediente não encontrado!' });

        await Ingrediente.destroy({
            where: {
                id: id
            }
        }).then(() => {
            return res.status(200).json({ message: `Ingrediente excluido com sucesso!` });
        }).catch((err) => {
            if (err.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ message: 'Este ingrediente não pode ser excluído pois há receitas que o utilizam!' });
            }
            return res.status(400).json({ message: 'Falha ao excluir Ingrediente!' });
        });
    },
}