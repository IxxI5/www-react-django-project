import { store } from "../state/store";

/**
 * @returns the min and max allowed dates [today - 28 days, today]
 */
function set() {
  const d = new Date();

  d.setDate(d.getDate() - 28); // current date minus 28 days

  const min = d.toJSON().slice(0, 10); // date format: yyyy-mm-dd
  const max = new Date().toJSON().slice(0, 10);
  return { min, max };
}

/**
 *
 * @param {*} fromDate
 * @param {*} toDate
 * @returns 0 for equal, 1 for toDate > fromDate and -1 for toDate < fromDate
 */
function compare(setFromDate, setToDate, setMinDate, setMaxDate) {
  const min = set().min;
  const max = set().max;

  const storedFromDate = store.getState().search.values.fromDate;
  const storedToDate = store.getState().search.values.toDate;

  setMinDate(min);
  setMaxDate(max);

  let date1 = null;
  let date2 = null;

  date1 = new Date(storedFromDate).getTime();
  date2 = new Date(storedToDate).getTime();

  if (storedFromDate === "" && storedToDate === "") {
    setFromDate(min);
    setToDate(max);

    date1 = new Date(min).getTime();
    date2 = new Date(max).getTime();
  }

  if (date2 < date1 && storedFromDate !== "" && storedToDate !== "") {
    setFromDate(storedToDate);
    setToDate(storedFromDate);
  }
}

/**
 * @description: bundle all functions into an object
 */
const dateRange = {
  set: () => set(),
  compare: (setFromDate, setToDate, setMinDate, setMaxDate, fromDate, toDate) =>
    compare(setFromDate, setToDate, setMinDate, setMaxDate, fromDate, toDate),
};

export default dateRange;
