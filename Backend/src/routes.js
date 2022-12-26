const express = require('express');
const ClienteController = require('./controllers/ClienteController');
const EnderecoController = require('./controllers/EnderecoController');
const PedidoController = require('./controllers/PedidoController');
const CarrinhoController = require('./controllers/CarrinhoController');
const ReceitaController = require('./controllers/ReceitaController');
const CategoriaController = require('./controllers/CategoriaController');
const IngredienteController = require('./controllers/IngredienteController');
const DoceController = require('./controllers/DoceController');
const ItemCarrinhoController = require('./controllers/ItemCarrinhoController');
const Ingredientes_receitaController = require('./controllers/Ingredientes_receitaController');
const ItemPedidoController = require('./controllers/ItemPedidoController');
const Receitas_doceController = require('./controllers/Receitas_doceController');
const ValorHoraController = require('./controllers/ValorHoraController');
const DiasEncomendaController = require('./controllers/DiasEncomendaController');
const CloudinaryController = require('./controllers/CloudinaryController');
const SettingsController = require('./controllers/SettingsController');
const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json();
})

//Not Signed in
routes.post('/login', AuthController.login);
routes.get('/categoria', CategoriaController.list);
routes.get('/produtos', DoceController.findAllDoce); //doces que estao disponiveis para venda
routes.get('/maisVendidos', ItemPedidoController.maisVendidos);
routes.get('/produto/:id', DoceController.findOneDoce);
routes.get('/maisProdutos/:idDoce', DoceController.maisProdutos);
routes.post('/clientes', ClienteController.store);//cadastro
routes.get('/categoria/home', CategoriaController.listHome);//categorias home
//buscar doce pela categoria
routes.get('/doceFilter', DoceController.listDocesFilter);



routes.use(AuthMiddleware);
//Signed in
//imagem cloudinary
routes.post('/deleteImage', CloudinaryController.delete);
//me
routes.get('/me', ClienteController.me);
routes.get('/profile', ClienteController.profile);
//settings
routes.post('/settings', SettingsController.create);
routes.get('/settings', SettingsController.list);
routes.get('/settings/:id', SettingsController.findOne);
routes.put('/settings/frete/:id', SettingsController.updateFrete);
routes.delete('/settings/:id', SettingsController.delete);

//cliente
routes.get('/clientes', ClienteController.list);
routes.get('/cliente/:id', ClienteController.findOne);
routes.put('/cliente/:id', ClienteController.update);
routes.delete('/cliente/:id', ClienteController.delete);
routes.get('/topClientes', ClienteController.topClientes);
routes.get('/users/administradores', ClienteController.administradores);
routes.patch('/users/administradores/add/:email', ClienteController.addAdmin);
routes.patch('/users/administradores/remove/:email', ClienteController.removeAdmin);

//endereco
routes.post('/clientes/:idCliente/enderecos', EnderecoController.store); //passar o id do cliente na criacao do endereco
routes.get('/clientes/:idCliente/enderecos', EnderecoController.list); //passar o id do cliente para buscar enderecos relacionados a ele
routes.get('/endereco/:idEndereco', EnderecoController.findOne); //passar o id do cliente para buscar enderecos relacionados a ele
routes.put('/cliente/:idCliente/endereco/:idEndereco', EnderecoController.update); //passar o id do cliente para buscar enderecos relacionados a ele
routes.delete('/cliente/:idCliente/endereco/:idEndereco', EnderecoController.delete);

//carrinho
routes.post('/clientes/:idCliente/carrinho', CarrinhoController.store);
routes.get('/clientes/:idCliente/carrinho', CarrinhoController.list); //
routes.get('/carrinho/:idCarrinho', CarrinhoController.listItens); //itens do carrinho, associar com o cliente?
routes.get('/carrinho', CarrinhoController.listAll); //pedidos do carrinho, associar com o cliente?

//itemCarrinho
routes.post('/itemCarrinho/doce/:idDoce/carrinho/:idCarrinho', ItemCarrinhoController.store);
routes.get('/itemCarrinho/:idItemCarrinho', ItemCarrinhoController.listOne); //
routes.get('/itemCarrinho', ItemCarrinhoController.listAll); //
routes.get('/itemCarrinho/carrinho/:idCarrinho', ItemCarrinhoController.listAllItensCliente); //
routes.delete('/itemCarrinho/:idItem', ItemCarrinhoController.delete); //
routes.patch('/carrinho/:idCarrinho/itemCarrinho/:idItem/quantidade', ItemCarrinhoController.update); //

//pedido /clientes/${idCliente}/pedidos
routes.post('/pedido/cliente/:idCliente', PedidoController.store); //passar o idEnderecoEntrega no body
routes.get('/clientes/:idCliente/pedidos', PedidoController.list); //pedidos do cliente 
routes.patch('/pedido/:idPedido/status', PedidoController.updateStatus); //editar status
routes.patch('/pedido/:idPedido/pagamento', PedidoController.updatePagamento); //editar pagamento
routes.put('/pedido/:idPedido', PedidoController.update); //editar pedido
routes.get('/pedidos/status', PedidoController.getPedidosPorStatus);
routes.get('/pedido/:idPedido', PedidoController.findOne); //pedidos do cliente
routes.delete('/pedido/:idPedido', PedidoController.delete); //pedidos do cliente
routes.get('/pedidosFiltered', PedidoController.getPedidosFiltered);
routes.get('/vendasPeriodo', PedidoController.vendasPeriodo);


//itemPedido
routes.post('/itemPedido/doce/:idDoce/pedido/:idPedido', ItemPedidoController.store);
routes.get('/itemPedido', ItemPedidoController.listAll); //
routes.delete('/itemPedido/:id', ItemPedidoController.delete); // //
routes.get('/itemPedido/:idItemPedido', ItemPedidoController.listOne); //
routes.get('/docesPeriodo', ItemPedidoController.docesPorPeriodo);
routes.get('/receitasPeriodo', ItemPedidoController.receitasPorPeriodo);
//categoria
routes.post('/categoria', CategoriaController.store); //
//
routes.get('/categoria/:id', CategoriaController.findOne); //
routes.put('/categoria/:id', CategoriaController.update); //
routes.delete('/categoria/:id', CategoriaController.delete);

//ingrediente
routes.post('/ingrediente/', IngredienteController.store);
routes.get('/ingredientes/', IngredienteController.list);
routes.get('/ingredientes/:id', IngredienteController.findOne);
routes.put('/ingrediente/:id', IngredienteController.update);
routes.delete('/ingrediente/:id', IngredienteController.delete);

//receita
routes.post('/receita', ReceitaController.store);
routes.get('/receita', ReceitaController.list);
routes.get('/receita/:id', ReceitaController.findOne);
routes.delete('/receita/:id', ReceitaController.delete);
routes.put('/receita/:id', ReceitaController.update);
// routes.get('/receita/ingrediente/:idIngrediente', ReceitaController.list);

//doce
routes.post('/doce', DoceController.store);
routes.get('/doce', DoceController.list);
routes.get('/doce/:id', DoceController.findOne);
routes.put('/doce/:id', DoceController.update);
routes.delete('/doce/:id', DoceController.delete);

//valorHora
routes.post('/valorHora', ValorHoraController.store);
routes.get('/valorHora', ValorHoraController.list);
routes.get('/valorHora/:id', ValorHoraController.findOne);
routes.put('/valorHora/:id', ValorHoraController.update);
routes.delete('/valorHora/:id', ValorHoraController.delete);
routes.delete('/valorHora', ValorHoraController.deleteAll);

//diasEncomenda
routes.post('/diasEncomenda', DiasEncomendaController.store);
routes.get('/diasEncomenda', DiasEncomendaController.list);

module.exports = routes;

//receitas_doce
// routes.post('receitas_doce/receita/:idReceita/doce/:idDoce', Receitas_doceController.store);
// routes.get('receitas_doce/receita/:idReceita/doce/:idDoce', Receitas_doceController.listOne);

//ingredientes_receita
// routes.post('/ingredientes_receita/ingrediente/:idIngrediente/receita/:idReceita', Ingredientes_receitaController.store);
// routes.get('/receitas', ReceitaController.list);