import { api } from "../lib/apiClient";

class CategoriaDataService {
  getAll() {
    return api.get("/categoria");
  }

  get(id) {
    return api.get(`/categoria/${id}`);
  }

  getHome() {
    return api.get('/categoria/home');
  }

  create(data) {
    return api.post("/categoria", data);
  }

  update(id, data) {
    return api.put(`/categoria/${id}`, data);
  }

  delete(id) {
    return api.delete(`/categoria/${id}`);
  }

  deleteAll() {
    return api.delete(`/categoria`);
  }

  findByTitle(nome) {
    return api.get(`/categoria?nome=${nome}`);
  }
}

export default new CategoriaDataService();
