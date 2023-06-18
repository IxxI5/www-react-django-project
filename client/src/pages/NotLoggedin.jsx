import React from "react";
import { FcInfo } from "react-icons/fc";

/**
 * @returns the NotLoggedIn Page when the user is not logged in
 */
function NotLoggedIn() {
  return (
    <div className="App" style={{ marginTop: 3 + "em" }}>
      <FcInfo size="3em" />
      <p>Sorry, you are not logged in</p>
    </div>
  );
}

export default NotLoggedIn;
