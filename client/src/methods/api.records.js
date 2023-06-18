import api from "../access/api";

/**
 * @returns the all records without their content e.g. /api/records/
 */
async function apirecords(
  endpoint,
  setEntries,
  setIsLoading,
  setMessage,
  setStatusCode
) {
  return await api
    .get(endpoint)
    .then((res) => {
      const array = res.data;
      setEntries(array);
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

/**
 * @returns a single complete record with its content e.g. /api/records/{id}
 */
async function apirecord(
  endpoint,
  SetData,
  setIsLoading,
  setMessage,
  setStatusCode
) {
  return await api
    .get(endpoint)
    .then((res) => {
      const array = res.data;
      SetData(array);
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

export { apirecords, apirecord };
