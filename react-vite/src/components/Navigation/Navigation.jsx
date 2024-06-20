import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import PlaySong from "../Songs/PlaySong/PlaySong";




function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="root">
      <nav className="nav-header">
        <NavLink className="logo-div" to="/songs/">
          <i className="fa-solid fa-music"></i>&nbsp;&nbsp;
          <div className="logo-text">BeatBox</div>
        </NavLink>
        <div className="nav-links-container">
          <NavLink className="nav-links" to="/about/">
            About
          </NavLink>
          <NavLink className="nav-links" to="/songs/">
            Songs
          </NavLink>
          {sessionUser && (
            <>
              <NavLink className="nav-links" to="/songs/new">
                Upload Song
              </NavLink>
              <NavLink className="nav-links" to="/songs/current">
                Manage
              </NavLink>
              <NavLink className="nav-links" to="/playlists/all">
                My Playlist
              </NavLink>
            </>
          )}
        </div>
        <div className="profile-button-container">
          <ProfileButton user={sessionUser} />
        </div>
      </nav>
      {/*
      <div className="nav-content">
        <div className="container">
          {sessionUser ? (
            <>
              <i
                className="fa-solid fa-music"
                style={{ fontSize: "40px", color: "black" }}
              ></i>
              &nbsp;&nbsp;&nbsp;
              <div className="user-info">
                {sessionUser.firstname} {sessionUser.lastname}
              </div>
              <div className="user-email">{sessionUser.email}</div>
            </>
          ) : (
            <div className="slogan">Explore. Love. Signup.</div>
          )}
        </div>
      </div> */}

      <div className="nav-footer">
        <h3 className="footer-text">
          BeatBox : "Sharing Sounds, Sharing Vibes"
        </h3>
      </div>

    </div>
  );
}



export default Navigation;
