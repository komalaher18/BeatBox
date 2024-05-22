import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songsReducer from "./songs";
import commentReducer from "./comments";
import playlistsReducer from "./playlists";
import playlistSongsReducer from "./playlistSongs";

const initialState = {
  playlists: {}
};

const rootReducer = combineReducers({
  session: sessionReducer,
  songsReducer,
  comments: commentReducer,
  // playlists: playlistsReducer,
  // playlistSongs: playlistSongsReducer
  playlists: playlistsReducer,
  playlistSongs: playlistSongsReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  // return createStore(rootReducer, preloadedState, enhancer);
  const store = createStore(rootReducer, preloadedState, enhancer);
  console.log("Initial Redux State:", store.getState());
  return store;
};

export default configureStore;
