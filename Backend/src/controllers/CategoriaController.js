const Categoria = require('../models/Categoria');
const { deleteImage } = require('../services/Cloudinary');
// const { update } = require('./DoceController');
const CloudinaryController = require('./CloudinaryController');

module.exports = {

  //listar todas as categorias cadastradas
  async list(req, res) {
    const categorias = await Categoria.findAll();

    if (!categorias) {
      return res.status(400).json({ message: 'Nenhuma categoria cadastrada!' });
    }

    return res.json(categorias);
  },

  async listHome(req, res) {
    const categorias = await Categoria.findAll({
      attributes: ['id', 'nomeCategoria', 'imagemCategoria'],
      include: [{
        association: 'doces',
        attributes: [],
        right: true, //rigth join
      }],
      limit: 6,
      order: [['nomeCategoria', 'ASC']]
    });

    if (!categorias) {
      return res.status(400).json({ message: 'Nenhuma categoria cadastrada!' });
    }

    return res.json(categorias);
  },

  async findOne(req, res) {
    const { id } = req.params;

    await Categoria.findByPk(id, {
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
            message: `Não foi possível encontrar a Categoria id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar categoria com id=" + id
        });
      });
  },

  //create
  async store(req, res) {
    const { nomeCategoria, imagemCategoria } = req.body;

    const [categoria, created] = await Categoria.findOrCreate({ //created: true se criou agora e false se já existe
      where: { nomeCategoria },
      defaults: {
        imagemCategoria
      }
    });

    if (created) {
      return res.status(200).json({ message: 'Categoria cadastrada!' });
      // return res.json(categoria);
    } else {
      return res.status(400).json({ message: 'Esta categoria já existe!' });
    }
  },

  async update(req, res) {
    const { nomeCategoria, imagemCategoria } = req.body;
    const { id } = req.params;

    const oldCategoria = await Categoria.findByPk(id);
    if (!oldCategoria) {
      return res.status(400).json({ message: 'Categoria não encontrada!' });
    }

    try {
      await Categoria.update(
        {
          nomeCategoria,
          imagemCategoria
        },
        {
          where: { id }
        });

      //se a foto tiver sido alterada, excluir a antiga do cloudinary
      if (!!oldCategoria.imagemCategoria) {
        if (oldCategoria.imagemCategoria !== imagemCategoria) {
          await deleteImage(oldCategoria.imagemCategoria);
        }
      }
      return res.status(200).json({ message: "Categoria alterada com sucesso!" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao alterar categoria!" })
    };
  },

  async delete(req, res) {
    const { id } = req.params;
    //ver se existe o id
    const categoriaExists = await Categoria.findByPk(id);
    if (!categoriaExists)
      return res.status(400).json({ message: 'Categoria não encontrada!' });

    await Categoria.destroy({
      where: {
        id: id
      }
    }).then(async () => {
      if (!!categoriaExists.imagemCategoria) {
        await deleteImage(categoriaExists.imagemCategoria);
      }

      return res.status(200).json({ message: `Categoria excluída com sucesso!` });
    }).catch((err) => {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ message: 'Esta categoria não pode ser excluída pois há doces que a utilizam!' });
      }
      return res.status(400).json({ message: 'Falha ao excluir Categoria!' });
    });

  },
}