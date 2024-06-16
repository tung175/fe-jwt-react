import { useHistory } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoginService } from "../../services/userService";

const Login = (props) => {
  const defaultObjValidInput = {
    isValidLogin: true,
    isValidPassword: true,
  };
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  let history = useHistory();

  const handleCreateNewAccount =  () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);

    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidLogin: false });
      toast.error("Pls enter your email or phone number");

      return false;
    }

    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Pls enter your password");

      return false;
    }

    let res = await LoginService(valueLogin, password)
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM)
      history.push('/users')
    } else {
      toast.error(res.data.EM)
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="container">
          <div className="row px-sm-0 px-3">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">FaceBook</div>
              <div className="detail">Some one ...</div>
            </div>
            <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
              <div className="brand d-sm-none">FaceBook</div>

              <input
                type="text"
                className={
                  objValidInput.isValidLogin
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address or phone number"
                value={valueLogin}
                onChange={(event) => setValueLogin(event.target.value)}
              />
              <input
                type="Password"
                className={
                  objValidInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <span className="text-center">
                <a className="forgot-password" href="#">
                  Forgot your Password?
                </a>
              </span>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleCreateNewAccount()}
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
