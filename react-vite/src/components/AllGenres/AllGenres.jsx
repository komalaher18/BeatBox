import "./AllGenres.css";
import SongInfo from "../SongInfo/SongInfo";


const AllGenres = ({
  genre,
  songs,
  showAddToPlaylist,
  showRemove,
  showEditDelete,
}) => {
  return (
    <div className="genre-container">
      <h2
        style={{
          color: "black",
          marginLeft: "200px",
          textDecoration: "underline",
        }}
        className="header-genre"
      >
        {genre}
      </h2>
      <div className="genre-songs">
        {songs.map((song) => (
          <SongInfo
            key={song.id}
            id={song.id}
            title={song.title}
            genre={song.genre}
            songImage={song.songImage}
            songUrl={song.songUrl}
            userId={song.userId}
            showAddToPlaylist={showAddToPlaylist}
            showRemove={showRemove}
            showEditDelete={showEditDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AllGenres;
