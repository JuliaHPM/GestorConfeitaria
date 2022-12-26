import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../lib/apiClient";

export const AuthContext = createContext();

export function signOut() {
  destroyCookie(undefined, 'gestorConfeitaria.token');
  Router.push('/');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  function logOut() {
    setUser();
    signOut();
    Router.push('/');
  }

  useEffect(() => {
    const { 'gestorConfeitaria.token': token } = parseCookies()
    if (token) {
      getMe();
    }
  }, [])

  function getMe() {
    api.get("/me").then(res => {
      const user = res.data;
      setUser(user)
    }).catch(() => {
      signOut();
    })
  }

  async function signIn(email, senha) {
    try {
      const response = await api.post('/login', {
        email,
        senha
      })
      const { cliente, token } = response.data;

      setUser(cliente);
      setAuth(token);
    } catch (err) {
      // console.log("AAA errr", err)
      throw err;

    }
  }

  function setAuth(token) {
    setCookie(undefined, 'gestorConfeitaria.token', token, {
      maxAge: 60 * 60 * 24 * 30, //30 dias
      path: '/'
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    Router.back();
  }

  return (
    // vai 'prover' o que for passado no value para os filhos
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, logOut, setAuth, getMe }}>
      {children}
    </AuthContext.Provider>
  )
}