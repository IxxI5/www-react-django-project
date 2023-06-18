import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import WordSearch from "./pages/WordSearch";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import apitest from "./access/test.access";

function App() {
  // on page refresh send a test request and on success (access token is still alive) update redux store (loggedin = true)
  useEffect(() => {
    apitest();
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <div className="jumbotron jumbotron-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<WordSearch />} />
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
