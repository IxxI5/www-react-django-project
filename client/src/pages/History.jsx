import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NotLoggedin from "./NotLoggedin";
import Records from "../components/Records";
import AlertMessage from "../components/AlertMessage";
import RecordsGraph from "../components/RecordsGraph";

import { apirecords, apirecord } from "../methods/api.records";

/**
 * @returns the History Page (user records retrieved from the backend db.sqlite3 database))
 */
function History() {
  const isLoggedin = useSelector((state) => state.user.values.loggedin); // gets redux store's state
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [recordId, setRecordId] = useState([]);
  const [data, setData] = useState([]);
  const [entry, setEntry] = useState("Select Record");
  const [update, setUpdate] = useState(false);

  /**
   * @returns the list of the stored entries (titles) in the backend db.sqlite3 database
   */
  useEffect(() => {
    if (isLoggedin) {
      apirecords(
        "records/",
        setEntries,
        setIsLoading,
        setMessage,
        setStatusCode
      );
    }
  }, [update]);

  /**
   * @param {*} entry
   * @description dropdown select handler (onSelect)
   */
  const onSelect = (entry) => {
    if (entry !== undefined) {
      setEntry(entry);

      const entrySplit = entry?.split(":");
      const id = parseInt(entrySplit[0]);

      setRecordId(id);
    }
  };

  /**
   * @description retrieve a complete record from backend db.sqlite3 database based on it recordId
   */
  useEffect(() => {
    if (isLoggedin) {
      setData({});
      if (entry !== "Select Record") {
        apirecord(
          `records/${recordId}`,
          setData,
          setIsLoading,
          setMessage,
          setStatusCode
        );
      }
    }
  }, [recordId]);

  return (
    <div className="App" style={{ marginTop: 3 + "em" }}>
      <h1 className="text-center text-primary font-weight-bold">HISTORY</h1>

      {message !== "" && (statusCode > 399 || statusCode === 0) && (
        <AlertMessage message={message} type="danger" />
      )}

      {entries.length > 0 && isLoggedin === true && (
        <Records record={entry} records={entries} onSelect={onSelect} />
      )}

      {entry !== "Select Record" && data.content && isLoggedin === true && (
        <RecordsGraph data={data} mission={false} />
      )}

      {isLoggedin === false && <NotLoggedin />}
    </div>
  );
}

export default History;
