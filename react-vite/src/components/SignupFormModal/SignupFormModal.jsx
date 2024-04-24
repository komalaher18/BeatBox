import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        firstname,
        lastname,
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="signup-div">
        <i className="fa-solid fa-music"></i>
        <h1>Sign Up for BeatBox</h1>
        {errors.server && <p className="error-message">{errors.server}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-label-div">
            <input
              className="signup-input"
              placeholder="First name"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          {errors.firstname && (
            <p className="error-message">{errors.firstname}</p>
          )}
          <div className="signup-label-div">
            <input
              className="signup-input"
              placeholder="Last name"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          {errors.lastname && (
            <p className="error-message">{errors.lastname}</p>
          )}

          <div className="signup-label-div">
            <input
              className="signup-input"
              placeholder="Email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {errors.email && <p className="error-message">{errors.email}</p>}
          {/* <label>
            Username */}
          <div className="signup-label-div">
            <input
              className="signup-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* </label> */}
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}

          <div className="signup-label-div">
            <input
              className="signup-input"
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
          {/* <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
          <button
            className="signup-btn"
            type="submit"
            // style={{ backgroundColor: "rgb(51, 141, 225)" }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
