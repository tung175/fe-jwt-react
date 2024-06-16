import { useHistory } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const defaultIsValid = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };

  const [isValid, setIsValid] = useState(defaultIsValid);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  const handleRegister = async () => {
    let check = isValidInputs();

    if (check === true) {
      let res = await registerNewUser(email, phone, username, password);

      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
        history.push("/login");
      } else {
        toast.error(res.data.EM);
      }
    }
  };

  const isValidInputs = () => {
    setIsValid(defaultIsValid);
    if (!email) {
      toast.error("Email is required");
      setIsValid({ ...defaultIsValid, isValidEmail: false });
      return false;
    }

    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      toast.error("Please enter a valid email address");
      setIsValid({ ...defaultIsValid, isValidEmail: false });
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      setIsValid({ ...defaultIsValid, isValidPhone: false });

      return false;
    }
    if (!phone) {
      toast.error("Phone is required");
      setIsValid({ ...defaultIsValid, isValidPassword: false });

      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not same");
      setIsValid({ ...defaultIsValid, isValidConfirmPassword: false });

      return false;
    }

    return true;
  };

  return (
    <>
      <div className="Register-container">
        <div className="container">
          <div className="row px-sm-0 px-3">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">FaceBook</div>
              <div className="detail">Some one ...</div>
            </div>
            <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
              <div className="brand d-sm-none">FaceBook</div>

              <label>Email: </label>
              <input
                type="text"
                className={
                  isValid.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label>Phone number: </label>
              <input
                type="text"
                className={
                  isValid.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <label>Username: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <label>Password: </label>
              <input
                type="Password"
                className={
                  isValid.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label>Re-enter password: </label>
              <input
                type="Password"
                className={
                  isValid.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => handleRegister()}
              >
                Register
              </button>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleLogin()}
                >
                  You have account? click login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
