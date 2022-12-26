import { api } from "../lib/apiClient";

class PedidoDataService {

  get(idPedido) { //pedidos do cliente
    return api.get(`/pedido/${idPedido}`);
  }

  getPedidos(idCliente) { //pedidos do cliente
    return api.get(`/clientes/${idCliente}/pedidos`);
  }

  getVendas(dataInicio, dataFinal) { //pedidos do cliente
    return api.get(`/vendasPeriodo/?dataInicio=${dataInicio}&dataFinal=${dataFinal}`);
  }

  getPedidosFiltered(idPedido, nomeCliente, status, pago, tipoEntrega, dataInicio, dataFinal, campoOrdem, ordem) { //pedidos do cliente
    return api.get(`/pedidosFiltered/?nomeCliente=${nomeCliente}&idPedido=${idPedido}&status=${status}&pago=${pago}&tipoEntrega=${tipoEntrega}&dataInicio=${dataInicio}&dataFinal=${dataFinal}&campoOrdem=${campoOrdem}&ordem=${ordem}`);
  }

  getPorStatus(data) {
    return api.get(`/pedidos/status`, data); //enviar o status por body
  }

  create(idCliente, data) {
    return api.post(`/pedido/cliente/${idCliente}`, data);
  }

  update(idPedido, data) {
    return api.put(`/pedido/${idPedido}`, data);
  }

  updateStatus(idPedido, data) {
    return api.patch(`/pedido/${idPedido}/status`, data);
  }

  updatePagamento(idPedido, data) {
    return api.patch(`/pedido/${idPedido}/pagamento`, data);
  }

  // deleteItem(id) {
  //   return api.delete(`/itemCarrinho/${id}`);
  // }

}

export default new PedidoDataService();
