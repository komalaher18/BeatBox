import "./AllGenres.css";
import SongInfo from "../SongInfo/SongInfo";


const AllGenres = ({ genre, songs }) => {
  return (
    <div className="genre-container">
      <h2
        style={{
          color: "black",
          marginLeft: "400px",
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
          />
        ))}
      </div>
    </div>
  );
};

export default AllGenres;
