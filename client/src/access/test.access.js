import api from "./api";
import { store } from "../state/store";
import { userLogin } from "../state/user";
import token from "./token.service";

/**
 * @description: test access to api and update of redux store
 */
function apitest() {
  let currentDate = new Date().toJSON().slice(0, 10); // date format: yyy-mm-dd e.g. 2023-05-16

  return api
    .get(
      `search/?category=everything&q=test&start_date=${currentDate}&end_date=${currentDate}`
    )
    .then(() => {
      console.log("You are still logged in");
      store.dispatch(
        userLogin({ loggedin: true, username: api.getCurrentUser() }) // redux store: user is still logged in
      );
    })
    .catch((err) => {
      store.dispatch(
        userLogin({ loggedin: false, username: "" }) // redux store => user is logged out due to a network error (backend is out of service)
      );

      token.removeUser();
      console.log("You are now logged out due to ", err.message);
      return err;
    });
}

export default apitest;
