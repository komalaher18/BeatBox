// import SongInfo from "../SongInfo";
import "./AllGenres.css";
import SongInfo from "../SongInfo/songInfo"

const AllGenres = ({ genre, songs }) => {
  return (
    <div className="genre-container">
      <h2 className="header-genre">{genre}</h2>
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
