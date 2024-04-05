from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

playlistsongs = db.Table(
    'playlistsongs',
    db.Column("songId", db.ForeignKey(add_prefix_for_prod("songs.id")), primary_key=True),
    db.Column("playlistId", db.ForeignKey(add_prefix_for_prod("playlists.id")), primary_key=True)
    )

if environment == "production":
    playlistsongs.schema = SCHEMA
