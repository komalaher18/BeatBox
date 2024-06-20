import React from "react";

import "./AboutPage.css";



function AboutPage() {
  return (
    <div className="about" style={{ marginLeft: "200px", fontSize: "18px" }}>
      <div
        style={{ paddingLeft: "510px", width: "600px", zIndex: "100" }}
        className="content"
      >
        <h1
          style={{ paddingLeft: "1em", paddingTop: "0.5em" }}
          className="multicolor-text"
        >
          Welcome to BeatBox!!!
        </h1>
        <p>
          BeatBox was developed solely for educational purpose at App Academy,{" "}
          <span style={{ fontWeight: "bold" }}> "SoundCloud". </span>
        </p>
        <div>
          "Sharing Sounds, Sharing Vibes" This tagline conveys the idea of users
          not only sharing their music but also influencing the atmosphere and
          mood through their contributions.
        </div>

        <h2 style={{ paddingTop: "25px" }}>Features</h2>
        <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Songs</h3>
        <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
          <li>Any user can view all the songs uploaded on the website.</li>
          <li>Any user can play the song.</li>
          <li>Any user can view details of the song</li>
          <li>Beatbox user can update/delete/add song to their playlist</li>
        </ul>
        <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>
          Upload Song
        </h3>
        <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
          <li>Beatbox user can upload the song using form.</li>
        </ul>
        <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Manage</h3>
        <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
          <li>Beatbox user can view all the songs uploaded by him/her.</li>
          <li>
            Beatbox user can upload a new song by providing related information
            like Title, Song image, Song Url & Genre.
          </li>
          <li>Beatbox user can update and delete any of his/her song.</li>
          <li>Beatbox user can comment on any song except his own.</li>
          <li>
            Beatbox user can update or delete his own comment on a particular
            song.
          </li>
        </ul>
        <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>
          My Playlist
        </h3>
        <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
          <li>Beatbox user can view all their own playlists.</li>
          <li>Beatbox user can view create/delete their own playlists.</li>
          <li>Beatbox user can move song from one playlistto other playlist.</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
