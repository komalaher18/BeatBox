from flask import Flask, jsonify, request, render_template, Blueprint, session, redirect;
from flask_login import current_user
from app.models import Comment, db, Song, User
from flask_login import login_required
from app.forms import UpdateCommentForm, PostCommentForm

comments_routes = Blueprint("comments_routes", __name__)

# View all comments on a song
@comments_routes.route("/<int:songId>", methods=["GET"])
def get_all_comments(songId):
    comments = Comment.query.filter_by(songId=songId).all()

    comments_data = [
        {
            "id": comment.id,
            "comment": comment.comment,
            "userId": comment.userId,
        }
        for comment in comments]

    for comment in comments_data:
        user = User.query.get(comment['userId'])
        comment['userName'] = user.username
    return jsonify(comments_data)


# Add a comment to a song
@comments_routes.route("/<int:songId>/postComments", methods=["POST"])
@login_required
def post_comment(songId):

    body = request.get_json(force=True)
    comment= body["comment"]
    song = body["song"]

    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user_songs = Song.query.filter_by(id=songId).first()
        song_owner_id =user_songs.to_dict()["userId"]
        user = User.query.filter_by(id=song_owner_id).first()


        if(current_user.id == user.to_dict()["id"]):
            return jsonify("Owner can not comment on his own song")

        new_comment = Comment(
            comment=form.data["comment"],
            songId=songId,
            userId=current_user.id,
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    if form.errors:
        return form.errors, 401


# update comment on a song:
@comments_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_comment(id):
    comment_to_be_updated = Comment.query.get(id)

    if not comment_to_be_updated:
        return {'error': 'Cound not find the selected comment'}, 404

    if comment_to_be_updated.userId != current_user.id:
        return {'error': 'Unauthorized'}, 403

    form = UpdateCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        comment_to_be_updated.comment=form.data['comment']
        db.session.commit()
        return comment_to_be_updated.to_dict()
    return form.errors, 401


# Remove comment from a song:
@comments_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment_to_be_deleted = Comment.query.get(id)

    if not comment_to_be_deleted:
        return jsonify({'error': 'Could not find the selected comment'} ), 404

    # If logged in user is not the owner of the song selected
    if comment_to_be_deleted.userId != current_user.id:
        return jsonify({'error': 'Unauthorized'} ), 403

    db.session.delete(comment_to_be_deleted)
    db.session.commit()
    return jsonify({'message': 'comment deleted successfully'})
