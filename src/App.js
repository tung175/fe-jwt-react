import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/navigation/Nav";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routers/AppRoutes";
import { useContext } from "react";
import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data ...</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <Nav />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}

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
