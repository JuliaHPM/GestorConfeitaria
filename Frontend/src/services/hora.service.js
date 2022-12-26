import { api } from "../lib/apiClient";

class HoraDataService {
  getAll() {
    return api.get("/valorHora");
  }

  get(id) {
    return api.get(`/valorHora/${id}`);
  }

  create(data) {
    return api.post("/valorHora", data);
  }

  update(id, data) {
    return api.put(`/valorHora/${id}`, data);
  }

  delete(id) {
    return api.delete(`/valorHora/${id}`);
  }

  deleteAll() {
    return api.delete(`/valorHora`);
  }

  // findByTitle(nome) {
  //   return api.get(`/valorHora?nome=${nome}`);
  // }
}

export default new HoraDataService();
