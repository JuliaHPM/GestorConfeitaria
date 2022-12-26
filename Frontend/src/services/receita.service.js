import { api } from "../lib/apiClient";

class ReceitaDataService {
  getAll() {
    return api.get("/receita");
  }

  get(id) {
    return api.get(`/receita/${id}`);
  }

  create(data) {
    return api.post("/receita", data);
  }

  update(id, data) {
    return api.put(`/receita/${id}`, data);
  }

  delete(id) {
    return api.delete(`/receita/${id}`);
  }

  deleteAll() {
    return api.delete(`/receita`);
  }

  findByTitle(nome) {
    return api.get(`/receita?nome=${nome}`);
  }
}

export default new ReceitaDataService();
