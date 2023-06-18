import api from "../access/api";
import filter from "./api.filter";

/**
 *
 * @param {*} category
 * @param {*} setIsLoading
 * @param {*} setData
 * @param {*} setMessage
 * @returns the fetched data from the backend web api
 */
function apisearch(
  search,
  category,
  fromDate,
  toDate,
  setIsLoading,
  setData,
  setMessage
) {
  let URL = `search/?category=${category}&q=${search}&start_date=${fromDate}&end_date=${toDate}`;

  setIsLoading(true);
  api
    .get(URL)
    .then((res) => {
      const array = res.data.articles;
      setData(filter.dataConverter(array));
    })
    .catch((error) => {
      setMessage(`${error.message}`);
      setData(null);

      if (error.message.includes("empty")) {
        setMessage("No Results");
      }
    })
    .finally(() => {
      setIsLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    });
}

export default apisearch;
