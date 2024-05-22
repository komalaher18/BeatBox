import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./PlayListDetails.css";
import * as plSongActions from "../../../redux/playlistSongs.js";
import SongInfo from "../../../components/SongInfo/SongInfo.jsx";
import { getAllSongsThunk } from "../../../redux/songs";
import * as playlistActions from "../../../redux/playlists.js";
import { getPlaylistSongsThunk } from "../../../redux/playlistSongs.js";


const PlaylistDetails = () => {
  const dispatch = useDispatch();
  const { playlist_id } = useParams();


  const playlist = useSelector((state) => state.playlists[playlist_id]);
  const playlistSongs = useSelector((state) => state.playlistSongs);
  const allSongs = useSelector((state) => state.songsReducer.songs_arr);

  useEffect(() => {
    if (!playlist) {
      dispatch(playlistActions.getPlaylistsThunk(playlist_id));
    }
  }, [dispatch, playlist, playlist_id]);


  useEffect(() => {
    if (!playlist) {
      dispatch(playlistActions.getPlaylistThunk(playlist_id));
    }
  }, [dispatch, playlist, playlist_id]);

  useEffect(() => {
    dispatch(plSongActions.getPlaylistSongsThunk(playlist_id));
  }, [dispatch, playlist_id]);

  useEffect(() => {
    if (allSongs.length === 0) {
      dispatch(getAllSongsThunk());
    }
  }, [dispatch, allSongs.length]);

  useEffect(() => {
    console.log("Updated playlistSongs state:", playlistSongs);
  }, [playlistSongs]);

  useEffect(() => {
    console.log("Updated playlists state:", playlist);
  }, [playlist]);


  const removeSong = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sId = e.target.getAttribute("songid");

    dispatch(plSongActions.removeSongFromPlaylistThunk(playlist_id, sId)).then(() =>
      dispatch(plSongActions.getPlaylistSongsThunk(playlist_id))
    );
  };

  return (
    <div className="container-playlist">
      <h2 className="playlist-title">--- {playlist?.title} ---</h2>
      <hr className="playlists"></hr>
      {playlistSongs.length > 0 ? (
        <div
          className="playlist-songs-container genre-songs"
          style={{ backgroundColor: "rgb(199, 194, 194)" }}
        >
          {playlistSongs.map((plSong, index) => {
            const songId = plSong.songId;
            const song = allSongs.find((song) => song.id === songId);
            if (!song) {
              return null;
            }

            return (
              <SongInfo
                key={index}
                id={song.id}
                title={song.title}
                genre={song.genre}
                songUrl={song.songUrl}
                songImage={song.songImage}
                userId={song.userId}
                removeSong={removeSong}
                showAddToPlaylist={true}
                showRemove={true}
                showEditDelete={false}
              />
            );
          })}
        </div>
      ) : (
        <div>No songs found in this playlist</div>
      )}
    </div>
  );
};

export default PlaylistDetails;
