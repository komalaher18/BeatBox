

const GET_PLAYLISTS = 'GET_PLAYLISTS';
const GET_PLAYLIST = 'GET_PLAYLIST';
const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

// Action Creators
const get_playlists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists
});

const get_playlist = (playlist) => ({
  type: GET_PLAYLIST,
  playlist
});

const delete_playlist = (playlistId) => ({
  type: DELETE_PLAYLIST,
  playlistId
});

// Thunks

export const getPlaylistsThunk = () => async (dispatch) => {
  try {
    console.log("Fetching playlists...");
    const response = await fetch("/api/playlists/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched playlists :", data);
      dispatch(get_playlists(data));
      return data;
    } else {
      throw response;
    }
  } catch (e) {
    return e;
  }
};

export const getPlaylistThunk = (id) => async (dispatch) => {
  try {
    console.log("Fetching playlist with ID:", id);
    const response = await fetch(`/api/playlists/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched playlist data:", data);
      dispatch(get_playlist(data));
      return data;
    } else {
      throw response;
    }
  } catch (e) {
    return e;
  }
};

export const create_playlist_thunk = (formData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/playlists/new`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
}

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      dispatch(delete_playlist(playlistId));
    } else {
      throw response;
    }
  } catch (e) {
    return e;
  }
};
// Playlist Reducer

const playlistsReducer = (state = {}, action) => {
  let new_state = { ...state };
  switch (action.type) {
    case GET_PLAYLISTS:

      action.playlists.forEach((playlist) => new_state[playlist.id] = playlist);
      return new_state;
    case GET_PLAYLIST:
      new_state[action.playlist.id] = action.playlist;
      return new_state;
    case DELETE_PLAYLIST:
      delete new_state[action.playlistId];
      return new_state;
    default:
      return state;
  }
};

export default playlistsReducer;
