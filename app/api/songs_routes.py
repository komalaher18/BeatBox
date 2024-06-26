from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Song
from flask_login import login_required
from app.forms.song_form import SongForm
from app.forms.songUpdate_form import SongUpdateForm
# from flask import request


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




# # upload new song
@songs_routes.route('/upload', methods=["POST"])
@login_required
def new_song():

    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = form.data["songUrl"]

        song.filename = get_unique_filename(song.filename)
        uploadResult = upload_file_to_s3(song)
        if "url" not in uploadResult:
            return {"error": "The upload was unsuccessful"}
        song_url = uploadResult["url"]
        new_song = Song(
            title=form.data["title"],
            genre=form.data["genre"],
            songImage=form.data["songImage"],
            songUrl=song_url,
            userId=current_user.id
        )

        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    return form.errors, 400

# @songs_routes.route('/upload', methods=["POST"])
# @login_required
# def new_song():
#     try:
#         title = request.form.get("title")
#         genre = request.form.get("genre")
#         song_image = request.form.get("songImage")
#         user_id = request.form.get("userId")
#         song_file = request.files.get("songUrl")

#         if not all([title, genre, song_image, user_id, song_file]):
#             return jsonify({'error': 'Missing required fields'}), 400


#         song_filename = get_unique_filename(song_file.filename)
#         upload_result = upload_file_to_s3(song_file)

#         if "url" not in upload_result:
#             return {"error": "The upload was unsuccessful"}, 400

#         song_url = upload_result["url"]

#         new_song = Song(
#             title=title,
#             genre=genre,
#             songImage=song_image,
#             songUrl=song_url,
#             userId=user_id
#         )
#         db.session.add(new_song)
#         db.session.commit()
#         return new_song.to_dict()
#     except Exception as e:
#         msg = str(e)
#         return {"message": msg}, 400



# update song
@songs_routes.route("/<int:songId>", methods=["PUT"])
@login_required
def update_song(songId):
    try:
        song_to_be_updated = Song.query.get(songId)
        # print("song_to_be_updated****", song_to_be_updated)
        if not song_to_be_updated:
            raise Exception("song can not be found")

        form = SongUpdateForm()
        # print("form.title***", form.data)
        form["csrf_token"].data = request.cookies["csrf_token"]
        # print("((((((")
        print("******form.validate", form.validate_on_submit())
        if form.validate_on_submit():
            if "songUrl" in request.files:
                image = request.files["songUrl"]
                if not allowed_file(image.filename):
                    raise TypeError("ImageType file not permitted")
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    raise TypeError("There was an error with AWS")
                song_to_be_updated.songUrl = upload["url"]

            song_to_be_updated.title = form.data["title"]
            # print("$$$$$title", song_to_be_updated.title)
            song_to_be_updated.genre = form.data["genre"]
            song_to_be_updated.songImage = form.data["songImage"]
            song_to_be_updated.userId = current_user.id



            db.session.commit()
            return song_to_be_updated.to_dict()
        else:
            return jsonify({'error': 'Form validation failed'}), 400
    except Exception as e:
        msg = str(e)
        return {"message": msg}




# Delete a song :
@songs_routes.route('/<int:songId>', methods=['DELETE'])
@login_required
def delete_song(songId):
    try:
        song_to_be_deleted = Song.query.filter_by(id=songId).first()
        delete = remove_file_from_s3(song_to_be_deleted.songUrl)

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
