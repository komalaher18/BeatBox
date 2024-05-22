const PLAYLIST_SONGS= "GET_PLAYLIST_SONGS"

// Action Creators
const playlist_songs = (songs) => {
  return {
    type: PLAYLIST_SONGS,
    songs
  }
}


// Thunks


export const getPlaylistSongsThunk = (id) => async (dispatch) => {
  try {
    console.log("Fetching playlist songs for playlist ID:", id);
    const response = await fetch(`/api/playlists/${id}/songs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched playlist songs data:", data);
      dispatch(playlist_songs(data));
      return data;
    } else {
      console.error("Failed to fetch playlist songs:", response);
      throw response;
    }
  } catch (e) {
    return e;
  }
};



export const add_song_to_pl = (formData, playlistId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/playlists/${playlistId}/add`, {
      method: 'POST',
      body: formData,
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
};

export const removeSongFromPlaylistThunk = (pId, sId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/playlists/${pId}/songs/${sId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getPlaylistSongsThunk(pId));
      return data;
    } else {
      throw response;
    }
  } catch (e) {
    console.error("Error removing song from playlist:", e);
    return e;
  }
};




// REDUCER
const playlistSongsReducer = (state = [], action) => {
  let new_state = [];
  switch (action.type) {
    case PLAYLIST_SONGS:
      action.songs.map((song) => new_state.push(song))
      return new_state;

    default:
      return state;
  }
}



export default playlistSongsReducer;
