from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Song
from flask_login import login_required
from app.forms.song_form import SongForm
import app.models
from app.api.awsS3 import allowed_file, upload_file_to_s3, get_unique_filename, remove_file_from_s3

songs_routes = Blueprint('songs', __name__)

# Get all songs
@songs_routes.route('/')
def all_songs():
    all_songs = Song.query.all()

    song_list = [{
        'id': song.id,
                   'title': song.title,
                   'genre': song.genre,
                   'songUrl':song.songUrl,
                   'songImage': song.songImage,
                   'userId': song.userId

                } for song in all_songs]

    return jsonify(song_list)

# Get all songs for the logged in User
@songs_routes.route('/current')
@login_required
def current_user_songs():
    all_songs = Song.query.filter_by(userId=current_user.id).all()
    # print("&&&&", all_songs)
    song_list = [{
                   'id': song.id,
                   'title': song.title,
                   'genre': song.genre,
                   'songUrl':song.songUrl,
                   'songImage': song.songImage,
                   'userId': song.userId
                } for song in all_songs]
    # print("%%%%", song_list)
    # return song_list.to_dict()
    return jsonify(song_list)



# Get details of a song by id
@songs_routes.route('/<int:id>')
def get_song_by_id(id):
    try:
        song =  Song.query.get(id)

        if not song:
            raise Exception("Song does not exist")

        return song.to_dict()
    except TypeError as e:
        msg = str(e)
        return {"message": msg}, 404


# Delete a song :
@songs_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    try:
        song_to_be_deleted = Song.query.get(id)
        print(song_to_be_deleted)

        if not song_to_be_deleted:
            return jsonify({'error': 'Could not find the selected song'}, 404 )

        if song_to_be_deleted.userId != current_user.id:
            return jsonify({'error': 'Unauthorized'}, 403 )

        remove_file_from_s3(song_to_be_deleted.songUrl)

        db.session.delete(song_to_be_deleted)
        db.session.commit()
        return jsonify({'message': 'Song deleted successfully'}, 200)
    except TypeError as e:
        msg = str(e)
        return {"message": msg}, 404

