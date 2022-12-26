import { api } from "../lib/apiClient";

class CloudinaryDataService {
  // getAll() {
  //   return http.get("/valorHora");
  // }

  // get(id) {
  //   return http.get(`/valorHora/${id}`);
  // }

  // create(data) {
  //   return http.post("/valorHora", data);
  // }

  // update(id, data) {
  //   return http.put(`/valorHora/${id}`, data);
  // }

  delete(public_id) {
    return api.post(`/deleteImage`, { public_id });
  }

  // deleteAll() {
  //   return http.delete(`/valorHora`);
  // }

}

export default new CloudinaryDataService();
