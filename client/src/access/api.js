/*
  https://github.com/bezkoder/react-jwt-refresh-token/tree/master/src
  configuration of axios interceptors
*/

import axios from "axios";
import token from "./token.service";
import { store } from "../state/store";
import { userLogin, userLogout } from "../state/user";
import { userSearchReset } from "../state/search";

const baseURL = "http://127.0.0.1:8000/api/";

/**
 * @description: basic axios config for accessing a Web API
 */
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * configure interceptor request (it automatically adds the Bearer token on any get or post request)
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const getToken = token.get();
    if (getToken) {
      config.headers["Authorization"] = "Bearer " + getToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * configure interceptor response (it automatically retries once, otherwise on token expiration, it requests a new refresh token)
 */
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "account/login/" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axiosInstance.post("account/refresh/", {
            refresh: token.refresh(),
          });

          const { access } = rs.data;
          token.update(access);

          return axiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

/**
 * @param {*} loginObj { username, password }
 * @returns the access and refresh tokens plus user access (login) to the backend web api
 * @description: it stores additionally the user object into local storage as also the login state and username into redux store
 * login
 */
async function login(loginObj) {
  return await axiosInstance
    .post("account/login/", JSON.stringify(loginObj))
    .then((response) => {
      if (response.data.access) {
        const userObj = {
          ...response.data,
          username: loginObj.username,
        };

        token.setUser(userObj);
        store.dispatch(
          userLogin({ loggedin: true, username: loginObj.username })
        );
      }

      return response.data;
    });
}

/**
 * @param {*} registerObj { username, email, password, password2 }
 * @description: user access (register) to the backend web api
 */
async function register(registerObj) {
  return await axiosInstance.post(
    "account/register/",
    JSON.stringify(registerObj)
  );
}

/**
 * @description: logout through deletion of the user object from local storage plus redux store update
 */
function logout() {
  token.removeUser();
  store.dispatch(userLogout());
  store.dispatch(userSearchReset());
}

/**
 * @returns the username of the logged in user
 */
function getCurrentUser() {
  return token.getUser().username;
}

/**
 * @description: bundle all functions into an object
 */
const api = {
  login: async (loginObj) => await login(loginObj),
  register: async (registerObj) => await register(registerObj),
  logout: () => logout(),
  getCurrentUser: () => getCurrentUser(),
  get: async (endpoint) => await axiosInstance.get(`${baseURL}${endpoint}`), // Promise (Bearer token is automatically (interceptor) added)
  post: async (endpoint, dataObj) =>
    await axiosInstance.post(
      `${baseURL}${endpoint}`,
      JSON.stringify(dataObj, null, 2)
    ), // Promise (Bearer token is automatically (interceptor) added)
};

export default api;
