const ValorHora = require('../models/ValorHora')

module.exports = {

    async list(req, res) {
        const valorHora = await ValorHora.findAll();
        return res.json(valorHora);
    },

    async findOne(req, res) {
        const {id} = req.params;
    
        await ValorHora.findByPk(id)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Não foi possível encontrar o valor de hora id=${id}.` + id
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Erro ao encontrar valor de hora com id=" + id
            });
          });
    },

    async store(req, res) {
        const { horasTrabMes, rendaDesejada, valorHora } = req.body;

        // const valorHoras = 
        await ValorHora.create({
            horasTrabMes,
            rendaDesejada,
            valorHora
        }).then(() => {
            return res.status(200).json({ message: 'Valor hora cadastrado com sucesso!' });
        }).catch(() => {
            return res.status(400).json({ error: 'Falha ao cadastrar valor de hora!' });
        });

        // return res.json(valorHoras);
    },

    async update(req, res) {
        const { id } = req.params;

        //ver se existe o id
        const valorHoraExists = await ValorHora.findByPk(id);
        if (!valorHoraExists)
            return res.status(400).json({ error: 'Valor de hora não encontrado!' });

        await ValorHora.update(req.body, {
            where: { id: id }
        }).then(() => {
            return res.status(200).json({ message: `Valor hora ${id} editado com sucesso!` });
        }).catch(() => {
            return res.status(400).json({ error: 'Falha ao editar valor de hora!' });
        });

    },

    async deleteAll(req, res) {
        await ValorHora.destroy({
            where: {},
            truncate: true
        }).then(nums => {
            return res.status(200).json({ message: `${nums} Valores de hora excluídos com sucesso` });
        }).catch(() => {
            return res.status(400).json({ error: 'Falha ao excluir valor de hora!' });
        })
    },

    async delete(req, res) {
        const { id } = req.params;

        //ver se existe o id
        const valorHoraExists = await ValorHora.findByPk(id);
        if (!valorHoraExists)
            return res.status(400).json({ error: 'Valor de hora não encontrado!' });

        await ValorHora.destroy({
            where: {
                id: id
            }
        }).then(() => {
            return res.status(200).json({ message: `Valor hora ${id} excluido com sucesso!` });
        }).catch(() => {
            return res.status(400).json({ error: 'Falha ao excluir valor de hora!' });
        });

    },
}