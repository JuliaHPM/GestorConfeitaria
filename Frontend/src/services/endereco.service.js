import { api } from "../lib/apiClient";

class EnderecoDataService {

  //   routes.post('/clientes/:idCliente/enderecos', EnderecoController.store); //passar o id do cliente na criacao do endereco
  // routes.get('/clientes/:idCliente/enderecos', EnderecoController.list); //passar o id do cliente para buscar enderecos relacionados a ele
  // routes.delete('/cliente/:idCliente/endereco/:idEndereco', EnderecoController.delete);

  update(idEndereco, idCliente, data) {
    return api.put(`/cliente/${idCliente}/endereco/${idEndereco}`, data);
  }

  getEnderecos(id) {
    return api.get(`/clientes/${id}/enderecos`)
  }

  get(id) {
    return api.get(`/endereco/${id}`);
  }

  create(idCliente, data) {
    return api.post(`/clientes/${idCliente}/enderecos`, data);
  }

  delete(idCliente, idEndereco) {
    return api.delete(`/cliente/${idCliente}/endereco/${idEndereco}`);
  }

}

export default new EnderecoDataService();
