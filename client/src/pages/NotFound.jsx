import { FaExclamationTriangle } from "react-icons/fa";

/**
 * @returns the NotFound Page for an invalid Route
 */
function NotFound() {
  return (
    <div className="App" style={{ marginTop: 3 + "em" }}>
      <FaExclamationTriangle className="text-danger" size="3em" color="red" />
      <p>Sorry, this page does not exist</p>
    </div>
  );
}

export default NotFound;
