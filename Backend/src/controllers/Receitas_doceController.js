
const Receita = require('../models/Receita');
const Doce = require('../models/Doce');
const Receitas_doce = require('../models/Receitas_doce');

module.exports = {
    //listar todos os doces e receitas relacionados?
    // async list(req, res) {

    //     const doces = await Doce.findAll();

    //     if (!ingredientes || ingredientes === null) {
    //         return res.status(400).json({ error: 'Nenhum ingrediente cadastrado!' });
    //     }
    //     return res.json(ingredientes);
    // },

    //create
    async store(req, res) {
        const { idReceita, idDoce } = req.params;
        const { quantReceita, unidadeDeMedida } = req.body;

        const receitaExists = await Receita.findByPk(idReceita);
        const doceExists = await Doce.findByPk(idDoce);

        if (receitaExists && doceExists) {
            const ingrediente_receita = await Receitas_doce.create({
                idReceita,
                idDoce,
                quantReceita,
                unidadeDeMedida
            });

            // return res.json(ingrediente_receita);
            return res.status(200).json({ message: 'Receita vinculada a doce!' });
            // return res.json(ingrediente);
        } else {
            return res.status(400).json({ error: 'Falha ao vincular receita!' });
        }


    }
}