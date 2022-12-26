import { api } from "../lib/apiClient";

class DoceDataService {
  getAll() {
    return api.get("/doce");
  }

  getMaisVendidos() {
    return api.get("/maisVendidos");
  }

  get(id) {
    return api.get(`/doce/${id}`);
  }

  getDoce(id) { //doce sem as receitas
    return api.get(`/produto/${id}`);
  }

  getDoces() { //doces disponiveis para venda
    return api.get(`/produtos`);
  }

  // getDocesCategoria(categoria, order) { //doces de acordo com a categoria
  //   return api.get(`/doce/categoria/?nomeCategoria=${categoria}/${order}`);
  // }

  getDocesFilter(categoria, ordem, pesquisa) { //doces de acordo com a categoria
    return api.get(`/doceFilter/?categoria=${JSON.stringify(categoria)}&ordem=${ordem}&pesquisa=${pesquisa}`);
  }

  getMaisProdutos(idDoce) {
    return api.get(`/maisProdutos/${idDoce}`);//{ idDoce: id }
  }

  getDocesPeriodo(status, dataInicio, dataFinal) {
    return api.get(`/docesPeriodo/?dataInicio=${dataInicio}&dataFinal=${dataFinal}&status=${status}`);//{ idDoce: id }
  }

  create(data) {
    return api.post("/doce", data);
  }

  update(id, data) {
    return api.put(`/doce/${id}`, data);
  }

  delete(id) {
    return api.delete(`/doce/${id}`);
  }

  deleteAll() {
    return api.delete(`/doce`);
  }

  findByTitle(nome) {
    return api.get(`/doce?nome=${nome}`);
  }
}

export default new DoceDataService();
