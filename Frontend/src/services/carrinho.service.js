import { api } from "../lib/apiClient";


class CarrinhoDataService {

  get(idCliente) {
    return api.get(`/clientes/${idCliente}/carrinho`);
  }

  getCarrinho(idCarrinho) {
    return api.get(`/itemCarrinho/carrinho/${idCarrinho}`); //itens do carrinho
  }

  createCarrinho(idCliente, data) {
    return api.post(`/clientes/${idCliente}/carrinho`, data); ///clientes/1/carrinho
  }

  createItemCarrinho(idDoce, idCarrinho, data) {
    return api.post(`/itemCarrinho/doce/${idDoce}/carrinho/${idCarrinho}`, data)
  }

  updateQuantidadeItem(idCarrinho, idItem, quantidade) {
    return api.patch(`/carrinho/${idCarrinho}/itemCarrinho/${idItem}/quantidade`, { quantidadeItem: quantidade })
  }

  deleteItem(id) {
    return api.delete(`/itemCarrinho/${id}`);
  }

}

export default new CarrinhoDataService();
