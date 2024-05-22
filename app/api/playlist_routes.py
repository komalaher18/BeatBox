from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import playlistsongs, Playlist, Song, db
from app.forms.playlist_form import PlayListForm

playlist_routes = Blueprint('playlists', __name__)

# # Get Playlists
@playlist_routes.route('/playlists/current')
@login_required
def user_playlists():
    playlists = Playlist.query.filter_by(userId=current_user.id).all()

    playlists_data = [{
        'id': playlist.id,
        'title': playlist.title,
        'playListImage': playlist.playListImage,
        'userId': playlist.userId,
        # 'songs': [song.to_dict() for song in playlist.songs]
    } for playlist in playlists]

    return jsonify(playlists_data)

# # Create Playlist
@playlist_routes.route('/playlists/new', methods=['POST'])
@login_required
def create_playlist():
    form = PlayListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.title.data
        playListImage = form.playListImage.data
        userId = current_user.id

        new_playlist = Playlist(title=title, playListImage=playListImage, userId=userId)

        db.session.add(new_playlist)
        db.session.commit()

        return jsonify(new_playlist.to_dict()), 201
    else:
        errors = form.errors
        print("Form errors:", errors)
        return jsonify({'errors': errors}), 400

# Delete Playlist
@playlist_routes.route('/playlists/<int:playlistId>', methods=['DELETE'])
@login_required
def delete_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)

    if not playlist:
        return jsonify('Playlist not found'), 404

    if playlist.userId != current_user.id:
        return jsonify('Unauthorized'), 403

    db.session.delete(playlist)
    db.session.commit()

    return jsonify('Playlist deleted successfully'), 200
