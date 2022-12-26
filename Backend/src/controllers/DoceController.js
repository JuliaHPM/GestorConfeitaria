const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { findByPk } = require('../models/Categoria');
const Categoria = require('../models/Categoria');
const Doce = require('../models/Doce');
const Receita = require('../models/Receita');
const { deleteImage } = require('../services/Cloudinary');

async function verifyIfExists(id) {
  const res = await Doce.findByPk(id);
  return !!res; //transforma em bool
}

module.exports = {

  async list(req, res) {
    const doces = await Doce.findAll({
      // attributes: ['id', 'nome'],
      include: [{
        model: Receita,
        as: 'receitas',
        // attributes: ['id', 'nome', 'marca'],
      }]
    });
    return res.json(doces);
  },

  async findOne(req, res) {
    const { id } = req.params;

    await Doce.findByPk(id, {
      // attributes: ['id', 'nome'],
      include: [{
        model: Receita,
        as: 'receitas',
        // attributes: ['id', 'nome', 'marca'],
      }]
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar o Doce id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar doce com id=" + id
        });
      });
  },

  async findOneDoce(req, res) {
    const { id } = req.params;

    await Doce.findByPk(id, {
      include: [{
        association: 'receitas',
        attributes: ['nome'],
        // include: [{ association: 'ingredientes' }]
      }]
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar o Doce id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar doce com id=" + id
        });
      });
  },

  async maisProdutos(req, res) {
    const { idDoce } = req.params;

    console.log(idDoce)

    await Doce.findAll({
      include: [{
        association: 'categoria',
        attributes: ['nomeCategoria']
      }],
      where: {
        disponivel: true,
        id: { [Op.ne]: idDoce } // nao pegar o doce que esta em destaque na tela produto
      },
      order: sequelize.literal('random()'),
      limit: 3
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Nenhum doce encontrado`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Nenhum doce encontrado"
        });
      });
  },

  async findAllDoce(req, res) { //doces para a tela de doces disponiveis
    const { id } = req.params;

    await Doce.findAll({
      where: { disponivel: true }
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Nenhum doce encontrado`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Nenhum doce encontrado"
        });
      });
  },

  async listDocesFilter(req, res) {
    const { categoria, ordem, pesquisa } = req.query;
    console.log(pesquisa)
    let ordenacao = 'ASC';
    let campoOrdenacao = 'nomeDoce';
    let query = {
      disponivel: true
    }

    if (ordem === 'addrecent') {
      campoOrdenacao = 'createdAt'
      ordenacao = 'DESC'
    } else if (ordem === 'menorpreco') {
      campoOrdenacao = 'valorTotalComMargem';
      ordenacao = 'ASC';
    } else if (ordem === 'maiorpreco') {
      campoOrdenacao = 'valorTotalComMargem';
      ordenacao = 'DESC';
    }

    if (pesquisa) {
      query.nomeDoce = {
        [Op.iLike]: `%${pesquisa}%`
      }
    }

    let categorias;
    if (categoria) {
      categorias = JSON.parse(categoria)
    } else {
      categorias = []
    }

    const doces = await Doce.findAll({
      attributes: ['id', 'nomeDoce', 'descricao', 'valorTotalComMargem', 'imagemDoce', 'peso'],
      include: {
        association: 'categoria',
        attributes: [],
        where: {
          nomeCategoria: {
            [Op.or]: categorias
            //['Trufa', 'Bento cake']
          }
        }
      },
      where: query,
      order: [[campoOrdenacao, ordenacao]]

    });
    return res.json(doces);
  },

  async store(req, res) {

    const payload = req.body;

    // console.log({ payload })

    const categoriaExists = await Categoria.findByPk(payload.idCategoria);

    if (!categoriaExists) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    try {
      const doce = await Doce.create(payload)

      // const referenciaDoce = await Doce.findByPk(doce.dataValues.id);

      payload.receitas.map(async (association) => {
        const receita = await Receita.findByPk(association.idReceita);
        await doce.addReceita(receita,
          {
            through:
            {
              quantReceita: association.quantReceita,
              unidadeDeMedida: association.unidadeDeMedida
            }
          })
      })
      return res.json(doce);
    } catch (err) {
      return res.status(400).json({ message: `Erro ${err}` })
    }
  },

  //update
  async update(req, res) {
    const { id } = req.params;
    const oldDoce = await Doce.findByPk(id);

    if (!oldDoce) {
      return res.status(404).json({ message: "Doce não encontrado!" });
    }

    const doce = req.body;

    const categoriaExists = await Categoria.findByPk(doce.idCategoria);

    if (!categoriaExists) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    try {
      await Doce.update(doce, {
        where: {
          id: id
        }
      });

      if (!!oldDoce.imagemDoce) {
        if (oldDoce.imagemDoce !== doce.imagemDoce) {
          await deleteImage(oldDoce.imagemDoce);
        }
      }
      const referenciaDoce = await Doce.findByPk(id);

      await referenciaDoce.setReceitas([]);//remover receitas da relacao

      doce.receitas.map(async (association) => {
        const receita = await Receita.findByPk(association.idReceita);
        await referenciaDoce.addReceita(receita,
          {
            through:
            {
              quantReceita: association.quantReceita,
              unidadeDeMedida: association.unidadeDeMedida
            }
          })
      })

    } catch (err) {
      return res.status(400).json({ message: "Erro ao alterar doce!", error: err })
    };

    return res.status(200).json({ message: "Doce alterado com successo!" });
  },


  async delete(req, res) {
    const { id } = req.params;

    //ver se existe o id
    const doceExists = await Doce.findByPk(id);
    if (!doceExists)
      return res.status(400).json({ error: 'Doce não encontrado!' });

    await Doce.destroy({
      where: {
        id: id
      }
    }).then(async () => {
      if (!!doceExists.imagemDoce) {
        await deleteImage(doceExists.imagemDoce);
      }
      return res.status(200).json({ message: `Doce excluido com sucesso!` });
    }).catch(() => {
      return res.status(400).json({ message: 'Falha ao excluir Doce!' });
    });

  },

}