import api from "../access/api";

/**
 * @param {*} dataObj results from search
 * @description It saves a record (results from search) into the backend (Django) db.sqlite3 database
 */
async function apisave(
  endpoint,
  dataObj,
  setIsLoading,
  setMessage,
  setStatusCode
) {
  return await api
    .post(endpoint, dataObj)
    .then((res) => {
      setStatusCode(res.status);
      setMessage(res.statusText);
    })
    .catch((error) => {
      setMessage(error.message);
      setStatusCode(400);
    })
    .finally(() => {
      setIsLoading(false);
      setTimeout(() => {
        setStatusCode(0);
        setMessage("");
      }, 2000);
    });
}

export default apisave;
