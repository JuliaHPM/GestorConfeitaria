import { api } from "../lib/apiClient";

class IngredienteDataService {
  getAll() {
    return api.get("/ingredientes");
  }

  get(id) {
    return api.get(`/ingredientes/${id}`);
  }

  create(data) {
    return api.post("/ingrediente", data);
  }

  update(id, data) {
    return api.put(`/ingrediente/${id}`, data);
  }

  delete(id) {
    return api.delete(`/ingrediente/${id}`);
  }

  deleteAll() {
    return api.delete(`/ingredientes`);
  }

  findByTitle(nome) {
    return api.get(`/ingredientes?nome=${nome}`);
  }
}

export default new IngredienteDataService();
