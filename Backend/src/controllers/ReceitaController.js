const Receita = require('../models/Receita');
const Ingrediente = require('../models/Ingrediente');

async function verifyIfExists(id) {
    const res = await Receita.findByPk(id);
    return !!res;
}

module.exports = {

    async findOne(req, res) {
        const { id } = req.params;

        await Receita.findByPk(id, {
            // attributes: ['id', 'nome'],
            include: [{
                model: Ingrediente,
                as: 'ingredientes',
                attributes: ['id', 'nome', 'marca'],
            }]
        })
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Não foi possível encontrar a Receita id=${id}.`
                    });
                }
            })
            .catch(() => {
                res.status(500).send({
                    message: "Erro ao procurar receita"
                });
            });
    },

    async list(req, res) {
        const receitas = await Receita.findAll(
            {
                // attributes: ['id', 'nome'],
                include: [{
                    model: Ingrediente,
                    as: 'ingredientes',
                    attributes: ['id', 'nome', 'marca'],
                }]
            }
        );

        if (!receitas)
            return res.status(400).json({ error: 'Nenhuma receita cadastrada!' });

        return res.json(receitas);
    },

    async store(req, res) {
        const { nome, tipoReceita, modoPreparo, anotacoes, custo, rendimento, tempoPreparo, unidadeDeMedida, ingredientes } = req.body;

        try {
            const receita = await Receita.create({
                nome,
                tipoReceita,
                modoPreparo,
                anotacoes,
                custo,
                rendimento,
                tempoPreparo,
                unidadeDeMedida,
            }
            )

            ingredientes.map(async (association) => {
                const ingrediente = await Ingrediente.findByPk(association.idIngrediente);
                await receita.addIngrediente(ingrediente,
                    {
                        through:
                        {
                            quantIngrediente: association.quantIngrediente,
                            unidadeDeMedida: association.unidadeDeMedida
                        }
                    })
            })
            return res.json(receita);
        } catch (err) {
            return res.status(400).json({ message: "Erro ao cadastrar receita!" })
        }

    },

    async update(req, res) {
        const { id } = req.params;
        const exists = await verifyIfExists(id);

        if (!exists) {
            return res.status(404).json({ message: "Receita não encontrada!" });
        }
        const { nome, tipoReceita, modoPreparo, anotacoes, custo, rendimento, tempoPreparo, unidadeDeMedida, ingredientes } = req.body;

        try {

            await Receita.update({
                nome,
                tipoReceita,
                modoPreparo,
                anotacoes,
                custo,
                rendimento,
                tempoPreparo,
                unidadeDeMedida,
            }, {
                where: {
                    id: id
                }
            }
            )

            const referenciaReceita = await Receita.findByPk(id);

            await referenciaReceita.setIngredientes([]);//remover ingredientes da relacao

            ingredientes.map(async (association) => {
                const ingrediente = await Ingrediente.findByPk(association.idIngrediente);
                await referenciaReceita.addIngrediente(ingrediente,
                    {
                        through:
                        {
                            quantIngrediente: association.quantIngrediente,
                            unidadeDeMedida: association.unidadeDeMedida
                        }
                    })

            })

        } catch (err) {
            return res.status(400).json({ message: "Erro ao alterar receita!" })
        };

        return res.status(200).json({ message: "Receita alterada com successo!" });
    },



    async delete(req, res) {
        const { id } = req.params;

        //ver se existe o id
        const exists = await verifyIfExists(id);

        if (!exists) {
            return res.status(404).json({ message: "Receita não encontrada!" });
        }

        await Receita.destroy({
            where: {
                id: id
            }
        }).then((err) => {
            if (err.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({ message: 'Esta categoria não pode ser excluída pois há doces que a utilizam!' });
            }
            return res.status(200).json({ message: `Receita excluida com sucesso!` });
        }).catch(() => {
            return res.status(400).json({ error: 'Falha ao excluir Receita!' });
        });

    },


}