import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      // navigate("/songs/");
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");
    // - to automate login of Demo User
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      // navigate("/songs/");
    }
    // to automate login of Demo User
  };

    return (
      <>
        <div className="login-div">
          <i className="fa-solid fa-list-music"></i>

          <h1>Log in to BeatBox </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="div-login-label">
              <input
                className="login-input"
                placeholder="Email address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {errors.email && <p className="error-message">{errors.email}</p>}
            <div className="div-login-label">
              <input
                className="login-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}

            <button className="signIn-btn" type="submit">
              Sign In
            </button>
            <div className="demo-link">
              <p>
                <a
                  href="#"
                  className="demo-user-link"
                  onClick={handleDemoLogin}
                >
                  Demo User
                </a>
              </p>
            </div>
          </form>
        </div>
      </>
    );
}

export default LoginFormModal;
