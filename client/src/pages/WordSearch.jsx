import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";

import NotLoggedin from "./NotLoggedin";
import AlertMessage from "../components/AlertMessage";
import Calendar from "../components/Calendar";
import Category from "../components/Category";
import Articles from "../components/Articles";

import apisearch from "../methods/api.search";
import apisave from "../methods/api.save";

import dateRange from "../methods/date.range";
import { store } from "../state/store";
import { userSearch } from "../state/search";

/**
 * @returns the WordSearch Page that consists of search Form
 */
function WordSearch() {
  const isLoggedin = useSelector((state) => state.user.values.loggedin);
  const storedFromDate = useSelector((state) => state.search.values.fromDate);
  const storedToDate = useSelector((state) => state.search.values.toDate);
  const storedSearch = useSelector((state) => state.search.values.search);
  const storedCategory = useSelector((state) => state.search.values.category);

  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("everything");
  const [search, setSearch] = useState("");

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  /**
   * @description: on Search Button press, make a test (if access token is still valid) and then a search call to the web api
   */
  const handleSubmit = () => {
    setData(null);
    apisearch(
      search,
      category,
      fromDate,
      toDate,
      setIsLoading,
      setData,
      setMessage
    );
  };

  /**
   * @description: on Save Button press, save the search results into backend db.sqlite3 database
   */
  const handleSave = () => {
    const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
    const dataObj = {
      title: `${fromDate}_to_${toDate}_:_${capitalized}_:_${search}`,
      content: data,
    };

    apisave("records/", dataObj, setIsLoading, setMessage, setStatusCode);
    setData(null); // clear the search results
  };

  /**
   * on first visit, populate fields with the store values
   */
  useEffect(() => {
    setFromDate(storedFromDate);
    setToDate(storedToDate);
    setSearch(storedSearch);
    if (storedCategory !== "") {
      setCategory(storedCategory);
    }
  }, []);

  /**
   * @param (fromDate, toDate)
   * @description: on change, trigger fromDate and toDate comparison
   */
  useEffect(() => {
    dateRange.compare(setFromDate, setToDate, setMinDate, setMaxDate);

    store.dispatch(
      userSearch({
        fromDate: fromDate,
        toDate: toDate,
        search: search,
        category: category,
      })
    );
  }, [
    setFromDate,
    setToDate,
    fromDate,
    toDate,
    search,
    setSearch,
    category,
    setCategory,
  ]);

  /**
   * @param {*} categ
   * @description: category select handler
   */
  const handleSelect = (categ) => {
    setCategory(categ);
  };

  return (
    <div style={{ marginTop: 3 + "em" }}>
      {isLoggedin === false && (
        <h1 className="text-center text-primary font-weight-bold">
          WORD SEARCH
        </h1>
      )}

      {statusCode >= 200 && statusCode <= 299 && (
        <AlertMessage message={message} type="success" />
      )}
      {message !== "" && (statusCode > 399 || statusCode === 0) && (
        <AlertMessage message={message} type="danger" />
      )}

      {isLoggedin && (
        <Container>
          <Form>
            <Row>
              <Col lg={3}>
                <Calendar
                  label={"From"}
                  name="fromDate"
                  min={minDate}
                  max={maxDate}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Col>
              <Col lg={3}>
                <Calendar
                  label={"To"}
                  name="toDate"
                  min={minDate}
                  max={maxDate}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Col>
              <Col lg={3}>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="search"
                  placeholder="Word Search"
                  aria-label="Search"
                  size="lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col lg={3}>
                <Category category={category} onSelect={handleSelect} />
              </Col>
            </Row>
            <Row className="text-center">
              <Container>
                <Button
                  style={{ marginTop: 2 + "em" }}
                  variant="outline-success"
                  size="lg"
                  onClick={() => handleSubmit()}
                  disabled={search === ""}
                >
                  Search{" "}
                  {isLoading && <Spinner animation="border" variant="light" />}
                </Button>
                {data && (
                  <Button
                    style={{ marginTop: 2 + "em", marginLeft: 4 + "em" }}
                    variant="outline-primary"
                    size="lg"
                    onClick={() => handleSave()}
                    disabled={search === ""}
                  >
                    Save
                  </Button>
                )}
              </Container>
            </Row>
          </Form>
        </Container>
      )}
      {data && isLoggedin === true && <Articles articles={data} />}
      {isLoggedin === false && <NotLoggedin />}
    </div>
  );
}

export default WordSearch;
