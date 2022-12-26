import axios from "axios";
import { Router } from "next/router";
import { parseCookies } from 'nookies'
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${cookies['gestorConfeitaria.token']}`
    }
  });

  api.interceptors.response.use(response => {
    return response;
  }, error => {
    console.log(error);
    if (error.response?.status === 401) {
      console.log("WINDOW: ", typeof window);

      if (typeof window !== 'undefined') {
        signOut();
      } else {
        return Promise.reject(new AuthTokenError())
      }

    }
    return Promise.reject(error);
  });
  return api;
}

// / https://backendmeudocinho.herokuapp.com/api