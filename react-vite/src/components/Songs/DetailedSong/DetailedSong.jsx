import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailedSongThunk } from "../../../redux/songs";
import { getAllSongsThunk } from "../../../redux/songs";
// import { NavLink, useNavigate } from "react-router-dom";
import "./DetailedSong.css";
import OpenModalButton from "../../OpenModalButton";
// comments

import { get_comments_thunk } from "../../../redux/comments";
import CreateNewComment from "../../Comments/CreateNewComment/CreateNewComment";
import EditComment from "../../Comments/EditComment/EditCommentModal";
import DeleteComment from "../../Comments/DeleteComment/DeleteCommentModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import AddSongToPlaylistModal from "../../AddSongToPlaylistModal/AddSongToPlaylistModal";


const DetailedSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const songId = parseInt(id);
  const song = useSelector((state) => state.songsReducer.byId[songId]);
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allComments = useSelector((state) => state.comments.allComments);
  const all_songs_in_state = useSelector(
    (state) => state.songsReducer.songs_arr
  );

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllSongsThunk());
      await dispatch(detailedSongThunk(songId));

      setIsLoaded(true);
    };
    getData();
  }, [dispatch, songId]);

  // Ka
  useEffect(() => {
    dispatch(get_comments_thunk(songId));
  }, [dispatch, songId]);
  //  ka

  const EditSongPage = (e, id) => {
    e.stopPropagation();
    navigate({
      pathname: `/songs/${id}/update`,
      state: { song: song },
    });
  };

  if (!song?.title) {
    return <div>...loading</div>;
  }

    return (
      <div>
        <div className="detailedSong-container">
          <div className="div">
            <div
              className="detailSong-info"
              style={{ backgroundColor: "rgb(199, 194, 194)" }}
            >
              <h1
                style={{
                  marginLeft: "100px",
                  position: "relative",
                  color: "black",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-20px",
                    // top: "40%",
                    marginTop: "10px",
                  }}
                >
                  •
                </span>
                {song.title}
              </h1>
              <h3
                className="songdetail-genre"
                style={{ color: "black", marginLeft: "90px" }}
              >
                {song.genre}
              </h3>
              <img
                src={song.songImage}
                alt={`${song.title} song cover image`}
                className="detailSong-image"
              />
            </div>
          </div>
          <hr className="divider-line" />

          <div className="detailSong-data">
            {sessionUser === song.sessionUser && (
              <span className="song-info-edit">
                <button onClick={(e) => EditSongPage(e, song.id)}>
                  Update song
                </button>
              </span>
            )}
            {sessionUser && (
              <span
                style={{ position: "absolute", top: "430px", right: "50px" }}
              >
                <OpenModalButton
                  buttonText="Add Song to Playlist"
                  modalComponent={<AddSongToPlaylistModal props={{ songId }} />}
                  buttonStyle={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
              </span>
            )}
          </div>
        </div>
        <div>
          <div>
            {allComments.length === 1 && (
              <span className="">
                <div>
                  <h3
                    style={{
                      paddingLeft: "1rem",
                      marginTop: "30px",
                      fontSize: "30px",
                    }}
                  >
                    <i className="fa-solid fa-comment"></i>
                    {allComments.length} comment:{" "}
                  </h3>
                </div>
              </span>
            )}
            {allComments.length > 1 && (
              <span className="">
                <div>
                  <h3
                    style={{
                      paddingLeft: "1rem",
                      marginTop: "30px",
                      fontSize: "30px",
                    }}
                  >
                    <i className="fa-solid fa-comment"></i> {allComments.length}{" "}
                    comments :
                  </h3>
                </div>
              </span>
            )}
            {allComments.length === 0 &&
              sessionUser &&
              sessionUser.id !== song.userId && (
                <span className="">
                  <div>
                    <h3
                      style={{
                        paddingLeft: "1rem",
                        marginTop: "30px",
                        fontWeight: "50px",
                      }}
                    >
                      <i className="fa-solid fa-comment"></i> Be the first
                      person to comment
                    </h3>
                  </div>
                </span>
              )}
          </div>
          <div style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
            {sessionUser && song && sessionUser.id !== song.userId && (
              <div>
                <CreateNewComment song={song} />
              </div>
            )}
          </div>
          <div style={{ paddingLeft: "1rem", paddingBottom: "2rem" }}>
            {allComments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    fontWeight: "normal",
                    marginTop: "20px",
                    marginBottom: "3px",
                    fontSize: "20px",
                    paddingBottom: "0.5rem",
                  }}
                >
                  {/* {comment.userName} : "{comment.comment}" */}
                  <div
                    style={{
                      display: "inline-block",
                      paddingLeft: "10px",
                      fontSize: "30px",
                    }}
                  >
                    •
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      border: "2px solid black",
                      padding: "5px",
                      marginLeft: "10px",
                      marginRight: "15px",
                    }}
                  >
                    {comment.userName}
                  </div>
                  :
                </div>

                <div style={{ marginLeft: "100px", fontSize: "20px" }}>
                  "{comment.comment}"
                </div>

                {sessionUser && sessionUser.id == comment.userId && (
                  <div>
                    <div
                      style={{ display: "inline-block", marginRight: "10px" }}
                    >
                      <OpenModalButton
                        buttonText={
                          <span
                            style={{
                              display: "inline-block",
                              width: "100px",
                              marginRight: "10px",
                            }}
                          >
                            <i
                              className="fa-solid fa-pen-to-square"
                              style={{ color: "blue", marginRight: "5px" }}
                            ></i>
                            <span style={{ color: "black", fontSize: "18px" }}>
                              Edit
                            </span>
                          </span>
                        }
                        modalComponent={
                          <EditComment
                            props={{ comment: comment, songId: id }}
                          />
                        }
                      />
                    </div>
                    <div
                      style={{ display: "inline-block", marginLeft: "10px" }}
                    >
                      <OpenModalButton
                        buttonText={
                          <span
                            style={{
                              display: "inline-block",
                              width: "100px",
                              marginLeft: "10px",
                            }}
                          >
                            <i
                              className="fa-solid fa-trash"
                              style={{ color: "red", marginRight: "5px" }}
                            ></i>
                            <span style={{ color: "black", fontSize: "18px" }}>
                              Delete
                            </span>
                          </span>
                        }
                        modalComponent={<DeleteComment comment={comment} />}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default DetailedSong;
