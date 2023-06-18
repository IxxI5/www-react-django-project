/*
  https://github.com/bezkoder/react-jwt-refresh-token/tree/master/src
  retrieving, updating setting and removing of tokens in local storage
*/

/**
 * @returns: the refresh token from local storage
 */
function refresh() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refresh;
}

/**
 * @returns: the access token from local storage
 */
function get() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.access;
}

/**
 * @param {*} token
 * @description: updates the current user token with a new one in local storage
 */
function update(token) {
  let user = JSON.parse(localStorage.getItem("user"));
  user.access = token;
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * @returns: the user object from local storage
 */
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

/**
 * @param {*} user: user object
 * @description:  sets a new user object in local storage
 */
function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * @description: removes user (token, refresh, username) object from local storage
 */
function removeUser() {
  localStorage.removeItem("user");
}

/**
 * @description: bundle all functions into an object
 */
const token = {
  refresh: () => refresh(),
  get: () => get(),
  update: (token) => update(token),
  getUser: () => getUser(),
  setUser: (user) => setUser(user),
  removeUser: () => removeUser(),
};

export default token;
