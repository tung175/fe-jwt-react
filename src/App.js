import logo from "./logo.svg";
// import "./App.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/navigation/Nav";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/ManageUser/Users";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* <Nav /> */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="*">
              {/* <NotFound /> */}
              404
            </Route>
          </Switch>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  );
}

export default App;
