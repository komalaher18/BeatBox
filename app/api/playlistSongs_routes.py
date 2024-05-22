from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import playlistsongs, Playlist, Song, db

playlistSongs_routes = Blueprint('playlistSongs', __name__)

# Get songs by playlist id
@playlistSongs_routes.route('/playlists/<int:playlistId>/songs')
@login_required
def get_pl_songs(playlistId):
      print("Received playlistId:", playlistId)
      playlist = Playlist.query.get(playlistId)

      if playlist:
            songs_formatted = [{'songId': song.id, 'pl_id': playlistId} for song in playlist.songs]
            return jsonify(songs_formatted)
      else:
            return jsonify('Playlist not found'), 404


# # Add Song to Playlist
@playlistSongs_routes.route('/playlists/<int:playlistId>/add', methods=['POST'])
@login_required
def add_pl_song(playlistId):
    songId = request.form.get('songId')

    song = Song.query.get(songId)
    playlist = Playlist.query.get(playlistId)

    if not song or not playlist:
        return jsonify('Song or Playlist not found'), 404

    current_playlist = Playlist.query.join(Playlist.songs).filter(Song.id == songId).first()

    if current_playlist:
        current_playlist.songs.remove(song)
        db.session.commit()
    playlist.songs.append(song)
    db.session.commit()

    return jsonify('Song moved to the new Playlist!')


# Remove a song from playlist
@playlistSongs_routes.route('/playlists/<int:playlistId>/songs/<int:songId>', methods=['DELETE'])
def remove_song_from_playlist(playlistId, songId):
  playlist = Playlist.query.get(playlistId)
  song = Song.query.get(songId)

  if song and playlist:
        playlist.songs.remove(song)
        db.session.commit()
        return jsonify('Song removed from Playlist!')
  else:
        return jsonify('Song or Playlist not found'), 404
