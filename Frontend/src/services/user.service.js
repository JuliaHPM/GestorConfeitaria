import { api } from "../lib/apiClient";

class UserDataService {
  getCliente(id) {
    return api.get(`/cliente/${id}`);
  }

  updateCliente(id, data) {
    return api.put(`/cliente/${id}`, data);
  }

  getClienteAndEnderecos(id) {
    return api.get(`/clientes/${id}/enderecos`)
  }

  getAll() {
    return api.get("/users");
  }

  get(id) {
    return api.get(`/users/${id}`);
  }

  create(data) {
    return api.post("/clientes", data);
  }

  update(id, data) {
    return api.put(`/users/${id}`, data);
  }

  delete(id) {
    return api.delete(`/cliente/${id}`);
  }

  // deleteAll() {
  //   return api.delete(`/users`);
  // }

  findByTitle(nome) {
    return api.get(`/users?nome=${nome}`);
  }

  login(data) {
    return api.post("/users/login", data);
  }

  getAllAdministradores() {
    return api.get('/users/administradores');
  }

  addAdmin(email) {
    return api.patch(`/users/administradores/add/${email}`)
  }
  removeAdmin(email) {
    return api.patch(`/users/administradores/remove/${email}`)
  }
}

export default new UserDataService();
