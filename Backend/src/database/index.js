const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Cliente = require('../models/Cliente');
const Endereco = require('../models/Endereco');
const Pedido = require('../models/Pedido');
const Carrinho = require('../models/Carrinho');
const ItemCarrinho = require('../models/ItemCarrinho');
const Doce = require('../models/Doce');
const Receita = require('../models/Receita');
const Ingrediente = require('../models/Ingrediente');
const Categoria = require('../models/Categoria');
const Ingredientes_receita = require('../models/Ingredientes_receita');
const ItemPedido = require('../models/ItemPedido');
const Receitas_doce = require('../models/Receitas_doce');
const Administrador = require('../models/Administrador');
const ValorHora = require('../models/ValorHora');
const DiasEncomenda = require('../models/DiasEncomenda');
const Settings = require('../models/Settings');

const connection = new Sequelize(dbConfig);

Cliente.init(connection);
Endereco.init(connection);
Pedido.init(connection);
Carrinho.init(connection);
ItemCarrinho.init(connection);
Doce.init(connection);
Receita.init(connection);
Ingrediente.init(connection);
Categoria.init(connection);
Ingredientes_receita.init(connection);
ItemPedido.init(connection);
Receitas_doce.init(connection);
Administrador.init(connection);
ValorHora.init(connection);
DiasEncomenda.init(connection);
Settings.init(connection);

//passar os models para fazer os relacionamentos
Cliente.associate(connection.models);
Endereco.associate(connection.models);
Pedido.associate(connection.models);
Carrinho.associate(connection.models);
ItemCarrinho.associate(connection.models);
Doce.associate(connection.models);
Receita.associate(connection.models);
Ingrediente.associate(connection.models);
Categoria.associate(connection.models);
ItemPedido.associate(connection.models);
Settings.associate(connection.models);

module.exports = connection;

// ferramentas para facilitar importação: consign e require directory