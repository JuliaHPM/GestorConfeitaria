const Cliente = require('../models/Cliente');
// const Endereco = require('../models/Endereco');
const Carrinho = require('../models/Carrinho');
const ItemCarrinho = require('../models/ItemCarrinho');
const Doce = require('../models/Doce');
const { listAll } = require('./CarrinhoController');

module.exports = {

  //listar o item e informações do doce?
  async listOne(req, res) {
    const { idItemCarrinho } = req.params;
    //ver se o cliente especificado existe antes de fazer a busca
    const item = await ItemCarrinho.findByPk(idItemCarrinho)
      // , {
      //     include: { association: 'doce' } //join com o doce
      // }
      ;

    if (!item) {
      return res.status(400).json({ error: 'Item não encontrado' });
    }

    return res.json(item);
    // return res.json(item.doce); //lista apenas informacoes do doce
  },

  async listAll(req, res) {
    await ItemCarrinho.findAll()
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar itens.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar itens"
        });
      });
  },

  async listAllItensCliente(req, res) { //getcarrinho
    const { idCarrinho } = req.params;
    await ItemCarrinho.findAll({
      where: {
        idCarrinho: idCarrinho
      },
      include: [{
        model: Doce,
        as: 'doce',
        attributes: ['nomeDoce', 'imagemDoce'],
      }], //join com o doce
      order: [['createdAt', 'DESC']],
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar itens.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar itens"
        });
      });
  },
  //create
  async store(req, res) {
    const { idDoce, idCarrinho } = req.params;
    const { quantidadeItem, valorTotalItem } = req.body;

    //ver se o doce existe
    const doce = await Doce.findByPk(idDoce);
    const carrinho = await Carrinho.findByPk(idCarrinho);

    if (!doce)
      return res.status(400).json({ message: 'Doce não encontrado' });

    if (!carrinho)
      return res.status(400).json({ message: 'Carrinho não encontrado' });

    //ver se o doce já está no carrinho
    const item = await Carrinho.findOne({
      where: {
        id: idCarrinho,
      },
      include: {
        association: 'itens',
        where: { idDoce }
      }
    })
    // console.log(item)

    if (item)
      return res.status(400).json({ message: 'Este produto já está em seu carrinho!' });


    const itemCarrinho = await ItemCarrinho.create({
      idDoce,
      idCarrinho,
      quantidadeItem,
      valorItem: doce.valorTotalComMargem,
      valorTotalItem
    });

    return res.json(itemCarrinho);
  },

  async update(req, res) {
    const { idCarrinho, idItem } = req.params;
    const { quantidadeItem } = req.body;

    // console.log({ idCarrinho, idItem, quantidadeItem })
    console.log(req.params)

    //ver se o doce existe
    const carrinho = await Carrinho.findByPk(idCarrinho);
    const itemCarrinho = await ItemCarrinho.findByPk(idItem);

    if (!carrinho)
      return res.status(400).json({ message: 'Carrinho não encontrado' });
    if (!itemCarrinho)
      return res.status(400).json({ message: 'Item não encontrado' });

    const newItemCarrinho = {
      quantidadeItem,
      valorTotalItem: quantidadeItem * itemCarrinho.valorItem
    }

    await ItemCarrinho.update(newItemCarrinho, {
      where: { id: idItem }
    }).then(() => {
      return res.status(200).send();
    }).catch((err) => {
      console.log(err)
      return res.status(400).json({ message: 'Erro ao alterar quantidade!', error: err });
    });
  },


  async delete(req, res) {
    const { idItem } = req.params;
    //ver se existe o id
    const itemExists = await ItemCarrinho.findByPk(idItem);
    // console.log(itemExists)
    if (!itemExists)
      return res.status(400).json({ message: 'Item não encontrado!' });

    await ItemCarrinho.destroy({
      where: {
        id: idItem
      }
    }).then(() => {
      return res.status(200).json({ message: `Item excluído com sucesso!` });
    }).catch(() => {
      return res.status(400).json({ message: 'Falha ao excluir item!' });
    });

  },
}