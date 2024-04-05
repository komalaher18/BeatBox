from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .playlistsong import playlistsongs


class Playlist(db.Model, UserMixin):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(200), nullable=False)
    playListImage = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', back_populates='playlists')
    songs = db.relationship('Song', secondary=playlistsongs, back_populates="playlists")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title':self.title,
            'playListImage':self.playListImage,
        }
