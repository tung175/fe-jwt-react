// import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/navigation/Nav";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routers/AppRoutes";
import { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState({})

  useEffect(() => {
    let session = sessionStorage.getItem('account')

    if (session) {
      setAccount(JSON.parse(session))
    }
  },[])

  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes/>
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
