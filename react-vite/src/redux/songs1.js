// Action Types
const GET_ALL_SONGS = "songs/GET_ALL_SONGS";
const GET_DETAILED_SONG = "songs/GET_DETAILED_SONG";
const CREATE_NEW_SONG = "songs/CREATE_NEW_SONG";
const GET_CURRENT_USER_SONGS = "songs/GET_CURRENT_USER_SONGS";
const UPDATE_SONG = "songs/UPDATE_SONG";
const DELETE_SONG = "songs/DELETE_SONG";
const GET_CURRENT_USER_SONGS_LOADED = "songs/GET_CURRENT_USER_SONGS_LOADED";
const SET_SONG = "songs/SET_SONG"


// Action Creators
const getAllSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs,
    };
};

const getDetailedSong = (song) => {
    return {
        type: GET_DETAILED_SONG,
        payload: song
    }
};

const getCurrentUserSongs = (songs) => {
  return {
    type: GET_CURRENT_USER_SONGS,
    songs,
  };
};

// const createNewSong = (song) => {
//     return {
//         type: CREATE_NEW_SONG,
//         payload: song,
//     }
// };

// const getCurrentGallery = (userId) => {
//     return {
//         type: GET_CURRENT_USER_SONGS,
//         payload: userId,
//     }
// };

// const updateSong = (id) => {
//     return {
//         type: UPDATE_SONG,
//         payload: id,
//     }
// }

const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        payload: songId,
    }
};

export const getCurrentUserSongsLoaded = () => {
  return {
    type: GET_CURRENT_USER_SONGS_LOADED,
  };
};

export const setSong = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};


// Thunks

// Get all Songs
export const getAllSongsThunk = () => async (dispatch) => {
    try {
        const response = await fetch("/api/songs/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getAllSongs(data.songs));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};
// export const getAllSongsThunk = () => async (dispatch) => {
//     const response = await fetch(`/api/songs`, {
//         method: "GET",
//         headers: {"Content-Type": "application/json"},
//     });
//     const songs = await response.json();
//     dispatch(getAllSongs(data.songs));
//     return songs;
// };

// // Get Song by id
// export const detailedSongThunk = (id) => async (dispatch) => {
//     try {

//         const response = await fetch(`/api/songs/${id}`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             dispatch(getDetailedSong(data));
//             return data;
//         } else {
//             throw response;
//         }
//     } catch (e) {
//         return e;
//     }
// };

// Get all Songs of current logged in user
// export const getCurrentUserGalleryThunk = () => async (dispatch) => {
//     try {

//         const response = await fetch("/api/songs/current", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });

//         if (response.ok) {
//             const data = await response.json();

//             dispatch(getCurrentUserSongs(data));
//             return data;
//         } else {
//             throw response;
//         }
//     } catch (e) {
//         return e;
//     }
// };
export const getCurrentUserGalleryThunk = () => async (dispatch) => {
  const response = await fetch(`/api/songs/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const songs = await response.json();
  dispatch(getCurrentUserSongs(songs));
  return songs;
};

// Create a new Song
export const createNewSongThunk = (songUpload) => async (dispatch) => {

    try {
        const options = {
            method: 'POST',
            body: songUpload
        }
        const response = await fetch(`/api/songs/new/${user.id}`, options);

        if (response.ok) {
            const data = await response.json();
            dispatch(getDetailedSong(data));
            return { ok: true, data };
        } else {
            const errorData = response.json();
            return { ok: false, data: errorData };
        }
    } catch (e) {
        return e;
    }
};


// Update a Song
export const editSongsThunk = (songId, songUpload) => async(dispatch) => {

    try {

         const options = {
            method: 'PUT',
            body: songUpload
        };
        const response = await fetch(`/api/songs/${songId}`, options);
        // console.log('&&&&&&&&&&&&&&response', response)
        if (response.ok) {
            // console.log('&&&&&&&&&&&&&&response', response)
                const data = await response.json();
                // console.log('&&&&&&&&&&&&&&data', data)
                dispatch(getDetailedSong(data));
                return { ok: true, data };
        } else {
                const errorData = await response.json();
                return { ok: false, errors: errorData };
        }
    } catch (e) {
        return e;
    }
};

// Delete a song by id
export const deleteSongThunk = (songId) => async (dispatch) => {
    try {

        const response = await fetch(`/api/songs/${songId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(deleteSong(songId));
            return { ok: true };

        } else {
            const errorData = await response.json();
            return { ok: false, errors: errorData };
        }
    } catch (e) {
        return e;
    }
};

// Songs Reducer
const initialState = {
    allSongs: {},
    currentUserSongs: {},
    currentUserSongsLoaded: false,
    currentSong: {},
};

const songsReducer = (state = initialState, action) => {

    switch (action.type){
        // case GET_ALL_SONGS: {
        //     newState.songs_arr = action.payload;

        //     for (let i = 0; i < action.payload.length; i++) {
        //         let song = action.payload[i]
        //         newState.byId[song.id] = song
        //     }
        //     return newState;
        // }

        // case GET_ALL_SONGS: {
        //     const allSongs = action.songs.reduce(
        //         (acc, song) => ({ ...acc, [song.id]: song }),
        //         {}
        //     );
        //     return {
        //         ...state,
        //         allSongs: { ...state.allSongs, ...allSongs },
        //     };
        // }
        case GET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.songs.reduce((acc, song) => {
                    acc[song.id] = song;
                    return acc;
                }, {}),
            };

        case GET_DETAILED_SONG: {
            const newSong = action.song;
            return {
                ...state,
                allSongs: { ...state.allSongs, [newSong.id]: newSong },
                currentUserSongs: { ...state.currentUserSongs, [newSong.id]: newSong },
            };
        }

        case GET_CURRENT_USER_SONGS_LOADED: {
            return { ...state, currentUserSongsLoaded: false, currentUserSongs: {} };
        }

        // case GET_DETAILED_SONG: {
        //     newState.songs_arr.id = action.payload
        //     newState.byId[action.payload.id] = action.payload

        //     return newState;
        // }


        // case GET_CURRENT_USER_SONGS: {
        //     const newById = {};
        //     newState.songs_arr = action.payload;
        //     for (let song of action.payload) {
        //         newById[song.id] = song
        //     }

        //     newState.byId = newById
        //     return newState;
        // }

        // case CREATE_NEW_SONG: {
        //     newState.songs_arr = [...newState.songs_arr, action.payload]
        //     newState.byId[action.payload.id] = action.payload

        //     return newState;
        // }

        case GET_CURRENT_USER_SONGS: {
            const currentUserSongs = action.songs.reduce(
        (acc, song) => ({ ...acc, [song.id]: song }),
        {}
        );
        return {
            ...state,
            currentUserSongs: { ...state.currentUserSongs, ...currentUserSongs },
            currentUserSongsLoaded: true,
        };
    }

    case SET_SONG: {
      return {
        ...state,
        currentSong: action.payload,
      };
    }

    case DELETE_SONG: {
      const newAllSongs = { ...state.allSongs };
      delete newAllSongs[action.songId];
      const newCurrentUserSongs = { ...state.currentUserSongs };
      delete newCurrentUserSongs[action.songId];
      return {
        ...state,
        allSongs: newAllSongs,
        currentUserSongs: newCurrentUserSongs,
      };
    }

    default:
        return state;

        // case UPDATE_SONG:
        //     const newArr = [...newState.songs_arr];
        //     const newUpdatedId = {...newState.byId};
        //     for(let i = 0; i < newState.songs_arr.length; i++){
        //         let currSong = newArr[i];
        //         if(currSong.id === action.payload.id){
        //             newArr[i] = action.payload;
        //             break;
        //         }
        //     }
        //     newState.songs_arr = newArr;

        //     newUpdatedId[action.payload.id] = action.payload;
        //     newState.byId = newUpdatedId
        //     return newState;

        // case DELETE_SONG: {
        //     const newById = {...newState.byId};
        //     delete newById[action.payload];
        //     newState.byId = newById

        //     const newSongs = newState.songs_arr.filter((song) => {
        //         return song.id !== action.payload;
        //     })

        //     newState.songs_arr = newSongs;
        //     return newState;
        // }


        // default:
        //     return newState;
    }
}

export default songsReducer;
