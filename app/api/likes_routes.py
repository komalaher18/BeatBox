from flask import Blueprint, session, request, redirect, jsonify, render_template
from flask_login import current_user
from app.models import db, Like, Song
from flask_login import login_required

likes_routes = Blueprint('likes', __name__)

# Get all liked songs for the logged in User
# @likes_routes.route('/all')
# @login_required
# def get_all_liked_songs():
#     get_all_liked_songs = Like.query.filter_by(userId=current_user.id).all()
#     liked_list = [
#         {
#             "id": like.id,
#             "songId": like.songId,
#             "userId": like.userId
#         }
#         for like in get_all_liked_songs
#     ]
#     return jsonify(liked_list)


#  get likes of a song
@likes_routes.route('/<int:id>')
def get_song_likes(id):
    likes = Like.query.filter(songId=id).all()

    if not likes:
        return jsonify({'error': 'No likes found for this song'}), 404

    song_likes = [like.to_dict() for like in likes]
    all_likes = len(song_likes)
    return jsonify({"likes": all_likes, 'song_id': id} )



# like a song
@likes_routes.route('/<int:id>', methods=["POST"])
@login_required
def like_a_song(id):

        song = Song.query.get(id)
        if song is None:
            return jsonify({'error': 'Song not found'}), 404

        likes = Like.query.filter_by(songId=id, userId=current_user.id).first()
        if likes:
            return jsonify({'error': 'Song is already liked by user'}), 403

        new_like = Like(
            songId = id,
            userId = current_user.id
        )
        print(new_like)
        db.session.add(new_like)
        db.session.commit()

        # update like count
        song_like_count = Like.query.filter_by(songId=id).count()

        return jsonify({'message': 'song has been liked successfully','like_count': song_like_count})


# Unlike a song:
@likes_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def unlike_a_song(id):

    song_to_be_unliked = Song.query.get(id)


    if song_to_be_unliked is None:
        return jsonify({'error': 'Song not found'}, 404)

    like_entry = Like.query.filter_by(songId=id, userId=current_user.id).first()
    if not like_entry:
        return jsonify({'error': 'unauthorized'}), 403

    db.session.delete(like_entry)
    db.session.commit()

    song_like_count = Like.query.filter_by(songId=id).count()
    return jsonify({'message': 'Song has been unfavorited successfully', 'like_count': song_like_count})
