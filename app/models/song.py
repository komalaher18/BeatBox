from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .playlistsong import playlistsongs
from .playlist import Playlist

class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    songUrl = db.Column(db.String(500), nullable=False)
    songImage = db.Column(db.String(500), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    user = db.relationship("User", back_populates="songs")
    comments = db.relationship("Comment", cascade="all, delete", back_populates="song")
    likes = db.relationship("Like", cascade="all, delete", back_populates="song")
    playlists = db.relationship('Playlist', secondary=playlistsongs, back_populates='songs')

    # def get_playlists(self):
    #     playlists = [playlist for playlist in self.playlists]
    #     return playlists

    def to_dict(self):
        return {
            'id': self.id,
            'title':self.title,
            'genre':self.genre,
            'songUrl': self.songUrl,
            'songImage':self.songImage,
            # 'likes': self.likes,
            'userId': self.userId,
            'playlists': [playlist.to_dict() for playlist in self.playlists]
        }
