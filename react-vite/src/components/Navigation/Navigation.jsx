import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="root">
      <div>
        <nav className="nav-header">
          <NavLink style={{ textDecoration: "none" }} to="/songs/">
            <div className="logo-div">
              <i className="fa-solid fa-music"></i>&nbsp;&nbsp;
              <div style={{ paddingTop: "8px" }}>BeatBox</div>
            </div>
          </NavLink>

          <div className="menu">
            <ProfileButton user={sessionUser} />
          </div>
        </nav>

        <div className="nav-background-image">
          {sessionUser ? (
            <div className="container">
              <i
                style={{
                  fontSize: "40px",
                  alignContent: "baseline",
                  color: "white",
                }}
                className="fa-solid fa-music"
              ></i>
              &nbsp;&nbsp;&nbsp;
              <div
                style={{
                  fontSize: "30px",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                }}
              >
                {sessionUser.firstname}
              </div>
              &nbsp;&nbsp;
              <div
                style={{
                  fontSize: "30px",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                }}
              >
                {sessionUser.lastname}
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div
                style={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "cursive",
                }}
              >
                {sessionUser.email}
              </div>
              <div className="nav-background-video"></div>
            </div>
          ) : (
            <div className="container">
              <i
                style={{
                  fontSize: "40px",
                  alignContent: "baseline",
                  color: "white",
                }}
                className="fa-solid fa-music"
              ></i>
              &nbsp;&nbsp;&nbsp;
              <div
                style={{
                  fontSize: "30px",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                }}
              >
                {/* Explore.Love.Signup. */}
              </div>
              &nbsp;&nbsp;
            </div>
          )}
        </div>
        <nav style={{ boxSizing: "border-box" }}>
          <div className="bottom-menu">
            {sessionUser ? (
              <div>
                <NavLink
                  style={{ paddingLeft: "40em" }}
                  className="nav-links"
                  to="/about/"
                >
                  About
                </NavLink>
                <NavLink
                  style={{ paddingLeft: "10em" }}
                  className="nav-links"
                  to="/songs/"
                >
                  Songs
                </NavLink>
                <NavLink
                  style={{ paddingLeft: "10em" }}
                  className="nav-links"
                  to="/songs/current"
                >
                  Manage
                </NavLink>
                <NavLink
                  style={{ paddingLeft: "10em" }}
                  className="nav-links"
                  to="/songs/new"
                >
                  Upload Song
                </NavLink>

                <NavLink
                  style={{ paddingLeft: "10em" }}
                  className="nav-links"
                  to="/favorites"
                >
                  my Favorites
                </NavLink>
              </div>
            ) : (
              // : null}
              <>
                {/* <NavLink
                  style={{ paddingLeft: "50em" }}
                  className="nav-links"
                  to="/about/"
                >
                  About
                </NavLink> */}
                {/* <NavLink
                  style={{ paddingLeft: "20em" }}
                  className="nav-links"
                  to="/songs/"
                >
                  Songs
                </NavLink> */}
                {!sessionUser && (
                  <div className="nav-signIn-signUp-div">
                    <OpenModalButton
                      buttonText="Log In"
                      modalComponent={<LoginFormModal />}
                      className="nav-sign-in-up-btn nav-sign-in-btn"
                    />
                    <OpenModalButton
                      buttonText="Create account"
                      modalComponent={<SignupFormModal />}
                      className="nav-sign-in-up-btn nav-sign-up-btn"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </nav>

        {/* <div>
          <div className="nav-footer">
            <div>
              <h3 className="footer-text">
                BeatBox : "Sharing Sounds, Shaping Vibes"
              </h3>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Navigation;
