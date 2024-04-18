// Action Types
const GET_ALL_SONGS = "songs/GET_ALL_SONGS";
const GET_DETAILED_SONG = "songs/GET_DETAILED_SONG";
const CREATE_NEW_SONG = "songs/CREATE_NEW_SONG";
const GET_CURRENT_USER_SONGS = "songs/GET_CURRENT_USER_SONGS";
const UPDATE_SONG = "songs/UPDATE_SONG";
const DELETE_SONG = "songs/DELETE_SONG";
const SET_CURRENT_SONG = "SET_CURRENT_SONG";
const CURRENT_USER_SONGS_AVAILABLE = "songs/CURRENT_USER_SONGS_AVAILABLE";
const CURRENT_USER_SONGS = "songs/CURRENT_USER_SONGS";



// Action Creators
const getAllSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs,
    };
};

const getDetailedSong = (songId) => {
    return {
        type: GET_DETAILED_SONG,
        payload: songId
    }
};

const createNewSong = (song) => {
    return {
        type: CREATE_NEW_SONG,
        payload: song,
    }
};

const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        payload: songId,
    }
};



const currentUserSongs = (songs) => {
  return {
    type: CURRENT_USER_SONGS,
    payload: songs,
  };
};

export const currentUserSongsAvailable = () => {
  return {
    type: CURRENT_USER_SONGS_AVAILABLE,
  };
};

const updateSong = (songId) => {
    return {
        type: UPDATE_SONG,
        payload: songId,
    }
}


export const setCurrentSong = (song) => {
  return {
    type: SET_CURRENT_SONG,
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
            dispatch(getAllSongs(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};

// Get Song by id
export const detailedSongThunk = (id) => async (dispatch) => {
    // console.log("%%%%%%%%%%%%%", songId)
    try {

        const response = await fetch(`/api/songs/${id}`, {

            method: "GET",
            headers: { "Content-Type": "application/json" },

        });
        console.log("%%%%%%%%%%%%%", id)

        if (response.ok) {
            const data = await response.json();
            dispatch(getDetailedSong(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};

// Create a new Song
export const createNewSongThunk = (songUpload) => async (dispatch) => {

    try {
        const options = {
            method: 'POST',
            body: songUpload
        }
        const response = await fetch(`/api/songs/upload`, options);
        // console.log("response&&&&&&&&&&", response)

        if (response.ok) {
            const data = await response.json();
            dispatch(createNewSong(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};


export const getCurrentUserSongsThunk = () => async (dispatch) => {
    try {

        const response = await fetch("/api/songs/current", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            console.log("response____", response)
            const data = await response.json();

            dispatch(currentUserSongs(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};

// // Update a Song
export const UpdateSongsThunk = (songId, songUpload) => async(dispatch) => {
    // console.log("song1234*********", song)


    try {
        const options = {
            method: 'PUT',
            body: songUpload
        };
        const response = await fetch(`/api/songs/${songId}`, options);
        if (response.ok) {
                const data = await response.json();
                dispatch(updateSong(data));
                return data
        } else {
            throw response;
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
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};





// Songs Reducer
const initialState = {
    songs_arr:[],
    byId:{},
    currentSong:{}
};

const songsReducer = (state = initialState, action) => {
    let newState = { ...state };
    // console.log("newState&&&&&", newState)

    switch (action.type){
        case GET_ALL_SONGS: {
            newState.songs_arr = action.payload;
            action.payload.forEach((song) => {
                newState.byId[song.id] = song;
            });
            return newState;
        }
        case GET_DETAILED_SONG: {
            newState.byId[action.payload.id] = action.payload
            return newState;
        }
         case CREATE_NEW_SONG: {
            newState.songs_arr.push(action.payload);
            newState.byId[action.payload.id] = action.payload

            return newState;
        }
        case DELETE_SONG: {
            const newById = {...newState.byId};
            delete newById[action.payload];
            newState.byId = newById

            const newSongs = newState.songs_arr.filter((song) => {
                return song.id !== action.payload;
            })

            newState.songs_arr = newSongs;
            return newState;
        }
        case CURRENT_USER_SONGS: {
            const newById = {};
            newState.songs_arr = action.payload;
            // console.log("newState.songs_arr******", newState.songs_arr)
            for (let song of action.payload) {
                newById[song.id] = song
            }

            newState.byId = newById
            return newState;
        }
        // case UPDATE_SONG:{
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
        // }
        case UPDATE_SONG: {
      const index = newState.songs_arr.findIndex(
        (song) => song.id === action.payload.id
      );
      newState.songs_arr[index] = action.payload;
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }
        case SET_CURRENT_SONG:{
            return {...newState, currentSong: action.payload}
        }









    default:
        return state;

    }

}

export default songsReducer;
