const Ingrediente = require('../models/Ingrediente');
const Receita = require('../models/Receita');
const Ingredientes_receita = require('../models/Ingredientes_receita');

module.exports = {
    //listar todos os ingredientes e receitas relacionados?
    // async list(req, res) {

    //     const ingredientes = await Ingrediente.findAll();

    //     if (!ingredientes || ingredientes === null) {
    //         return res.status(400).json({ error: 'Nenhum ingrediente cadastrado!' });
    //     }
    //     return res.json(ingredientes);
    // },

    //create
    async store(req, res) {
        const { idReceita, idIngrediente } = req.params;
        const { quantIngrediente, unidadeDeMedida } = req.body;

        const ReceitaExists = await Receita.findByPk(idReceita);
        const ingredienteExists = await Ingrediente.findByPk(idIngrediente);

        if (ReceitaExists && ingredienteExists) {
            const ingrediente_receita = await Ingredientes_receita.create({
                idReceita,
                idIngrediente,
                quantIngrediente,
                unidadeDeMedida
            });

            // return res.json(ingrediente_receita);
            return res.status(200).json({ message: 'Ingrediente vinculado a receita!' });
            // return res.json(ingrediente);
        } else {
            return res.status(400).json({ error: 'Falha ao vincular ingrediente!' });
        }


    }
}