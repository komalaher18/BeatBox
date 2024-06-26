import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllSongs from "../components/Songs/AllSongs/AllSongs";
import DetailedSong from '../components/Songs/DetailedSong/DetailedSong';
import CreateNewSong from '../components/Songs/CreateNewSong/CreateNewSong';
import AboutPage from "../components/AboutPage/AboutPage"
import ManageSongs from '../components/Songs/ManageSongs/ManageSongs';
import UpdateSong from '../components/Songs/UpdateSong/UpdateSong';
import CreateNewComment from '../components/Comments/CreateNewComment/CreateNewComment';
import EditComment from '../components/Comments/EditComment/EditCommentModal';
import NotFound from '../components/NotFound/NotFound';
import PlaySong from '../components/Songs/PlaySong/PlaySong';
import Playlists from '../components/Playlists/GetPlaylists/GetPlaylists';
import PlaylistDetails from '../components/Playlists/Playlistdetails/PlayListDetails';
import CreatePlaylist from '../components/Playlists/CreatePlaylist/CreatePlaylist';
import AddSongToPL from '../components/Playlists/AddPlaylistSong/AddPlaylistSong';






export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <h1>Welcome!</h1>,
      // },
      {
        path: "/about/",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/",
        element: <AllSongs />,
      },
      {
        path: "/songs/current",
        element: <ManageSongs />,
      },

      {
        path: "/songs/",
        element: <AllSongs />,
      },
      {
        path: "/songs/:id",
        element: <DetailedSong />,
      },
      {
        path: "/songs/new",
        element: <CreateNewSong />,
      },

      {
        path: "/songs/:songId/update",
        element: <UpdateSong />,
      },
      {
        path: "/:id/comments/new",
        element: <CreateNewComment />,
      },
      {
        path: "/:id/:id/updateComment",
        element: <EditComment />,
      },
      {
        path: "/playlists/all",
        element: <Playlists />,
      },
      {
        path: "/playlists/:playlist_id",
        element: <PlaylistDetails />,
      },

      {
        path: "/playlists/new",
        element: <CreatePlaylist />,
      },
      {
        path:"/playlists/add-song/:songId",
        element: <AddSongToPL />,
      },

      {
        path: "*",
        element: (
          <>
            <NotFound />
            <PlaySong />
          </>
        ),
      },
    ],
  },
]);
