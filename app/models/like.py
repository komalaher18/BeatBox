from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Like(db.Model, UserMixin):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    songId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    song = db.relationship("Song", back_populates="likes")
    user = db.relationship("User", back_populates="likes")


    def to_dict(self):
        return {
            'id': self.id,
            'songId': self.songId,
            'userId': self.userId,
        }
