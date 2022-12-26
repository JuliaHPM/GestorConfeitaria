const Carrinho = require('../models/Carrinho');
const Cliente = require('../models/Cliente')
const { hash } = require('bcrypt');
const { generateToken } = require('../services/Jwt');
const { deleteImage } = require('../services/Cloudinary');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

module.exports = {

  async list(req, res) {
    const clientes = await Cliente.findAll();
    return res.json(clientes);
  },

  async findOne(req, res) {
    const { id } = req.params;

    await Cliente.findByPk(id, {
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
            message: `Não foi possível encontrar cliente id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar cliente com id=" + id
        });
      });
  },

  async me(req, res) {
    const id = req.userId;

    await Cliente.findByPk(id, {
      // attributes: ['id', 'nome', 'email', 'fotoPerfil'],//FALTA ADMIN 
      attributes: { exclude: ['senha'] },
      include: [
        // 'enderecos',
        {
          association: 'carrinho',
          attributes: ['id']
          //   include: [{
          //     association: 'itens', 
          //     attributes: [[sequelize.fn("sum", sequelize.col("quantidade")), "totalQuantity"],
          // ], }]
        },
        // {
        //   association: 'pedidos',
        //   include: [{ association: 'itensPedido', }]
        // }
      ],
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar cliente id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar cliente com id=" + id
        });
      });
  },

  async profile(req, res) {
    const id = req.userId;

    await Cliente.findByPk(id, {
      include: [{ association: 'enderecos' }],
      attributes: { exclude: ['senha'] }
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar usuário.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao encontrar encontrar usuário"
        });
      });
  },

  async topClientes(req, res) {

    const clientes = await Cliente.findAll({
      include: [{
        association: 'pedidos', attributes: [], required: true,
      }],
      attributes: {
        exclude: ['senha', 'telefone', 'dataNasc', 'sexo', 'admin',],
        include: [[sequelize.fn("COUNT", sequelize.col("pedidos.id")), "pedidosCount"]]
      },

      group: ['Cliente.id'],
      order: [[sequelize.col('pedidosCount'), "DESC"]],
      // limit: 5
    })
    // const clientes = await Cliente.findAll({
    //   group: "Cliente.id",
    //   include: [{
    //     association: 'pedidos',
    //     attributes: ['id'],
    //     include: [
    //       {
    //         association: 'itensPedido',
    //         // attributes: [
    //         //   [sequelize.fn("sum", sequelize.col("quantidade")), "totalQuantity"],
    //         // ]
    //       }]
    //   }],
    //   // order: [[sequelize.col("pedidos.itensPedido.totalQuantity"), "DESC"]],
    //   limit: 5,
    // });

    const limitClientes = clientes.filter((element, index) => index <= 4);
    console.log(limitClientes.length)

    return res.json(limitClientes);
  },

  async administradores(req, res) {
    const clientes = await Cliente.findAll({
      attributes: {
        exclude: ['senha', 'telefone', 'dataNasc', 'sexo', 'admin',],
      },
      where: { admin: true },
      order: [[sequelize.col('nome'), "ASC"]]
    })

    return res.json(clientes);
  },

  async addAdmin(req, res) {
    const { email } = req.params;

    const oldUser = await Cliente.findOne({
      where: { email }
    });

    if (!oldUser) {
      return res.status(400).json({ message: 'Não existe um usuário com esse email!' })
    }
    if (oldUser.admin) {
      return res.status(400).json({ message: 'Este usuário já é administrador!' })
    }

    try {
      await Cliente.update({ admin: true }, {
        where: { email }
      });
    } catch (err) {
      return res.status(400).json({ message: 'Ocorreu um erro ao alterar usuário!', error: err })
    } finally {
      return res.status(200).json({ message: `${oldUser.nome} agora é um administrador!` });
    }

  },

  async removeAdmin(req, res) {
    const { email } = req.params;

    const oldUser = await Cliente.findOne({
      where: { email }
    });

    if (!oldUser) {
      return res.status(400).json({ message: 'Não existe um usuário com esse email!' })
    }
    if (!oldUser.admin) {
      return res.status(400).json({ message: 'Este usuário não é administrador!' })
    }

    try {
      await Cliente.update({ admin: false }, {
        where: { email }
      });
    } catch (err) {
      return res.status(400).json({ message: 'Ocorreu um erro ao alterar usuário!', error: err })
    } finally {
      return res.status(200).json({ message: `${oldUser.nome} deixou de ser um administrador!` });
    }




  },

  async store(req, res) {
    const dataFields = req.body;
    try {
      const passwordHash = await hash(dataFields.senha, 7);

      const cliente = await Cliente.create({
        ...dataFields,
        senha: passwordHash,
        admin: false
      });

      if (cliente) {
        await Carrinho.create({
          idCliente: cliente.dataValues.id
        });
      }

      const token = generateToken({ id: cliente.dataValues.id, admin: cliente.dataValues.admin });
      return res.status(200).json({ message: `Cliente salvo com sucesso!`, token: token });

    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: 'Este email já está sendo usado!', error: err });
      }
      return res.status(400).json({ message: 'Falha ao cadastrar cliente!', error: err });
    }



  },

  async update(req, res) {
    const { id } = req.params;
    // console.log("body update: ", req.body);

    //ver se existe o id
    const oldUser = await Cliente.findByPk(id);
    if (!oldUser)
      return res.status(400).json({ error: 'Cliente não encontrado!' });

    //salvar a senha atual se o campo senha estiver em branco
    let passwordHash = oldUser.senha;
    if (req.body.senha?.length > 0) {
      passwordHash = await hash(req.body.senha, 7);
    }

    try {
      await Cliente.update({
        ...req.body,
        senha: passwordHash
      }, {
        where: { id: id }
      });

      //se a foto tiver sido alterada, excluir a antiga do cloudinary
      if (!!oldUser.fotoPerfil) {
        if (oldUser.fotoPerfil !== req.body.fotoPerfil) {
          await deleteImage(oldUser.fotoPerfil);
        }
      }

      return res.status(200).json({ message: "Usuário alterado com sucesso!" });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao alterar usuário!", error: err })
    };

  },

  async delete(req, res) {
    const { id } = req.params;

    //ver se existe o id
    const userExists = await Cliente.findByPk(id);
    if (!userExists)
      return res.status(400).json({ error: 'Cliente não encontrado!' });

    await Cliente.destroy({
      where: {
        id: id
      }
    }).then(async () => {
      return res.status(200).json({ message: `Cliente excluido com sucesso!` });
    }).catch((err) => {
      return res.status(400).json({ message: 'Falha ao excluir Cliente!', error: err });
    });

  },
}