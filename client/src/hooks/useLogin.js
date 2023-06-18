import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { userLogin, userLogout } from "../state/user";

/**
 * @returns the useLogin Custom Hook that interacts with the Redux store
 */
function useLogin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.values);

  const setLogin = useCallback((obj) => dispatch(userLogin(obj)), [dispatch]);
  const setLogout = useCallback(() => dispatch(userLogout()), [dispatch]);

  return {
    user,
    setLogin,
    setLogout,
  };
}

export default useLogin;
