from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(title='Walkman', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music1.mov", songImage="https://i1.sndcdn.com/artworks-TTc9R3VM8y0aRNf2-pWA79w-t240x240.jpg")
    song2 = Song(title='Lights', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music2.mov", songImage="https://i1.sndcdn.com/avatars-3NUCuSaZ69YQaemi-VsuBTQ-t240x240.jpg")
    song3 = Song(title='JingleBells', genre="Hip-hop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music3.mov", songImage="https://i1.sndcdn.com/avatars-UShkzO4J2rhdHZJg-k7rawQ-t240x240.jpg")
    song4 = Song(title='Dark', genre="Hip-hop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music4.mov", songImage="https://i1.sndcdn.com/artworks-000098273850-taolqs-t500x500.jpg")
    song5 = Song(title='Clean', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music1.mov", songImage="https://cdn.wallpapersafari.com/40/70/tR60ij.jpg")
    song6 = Song(title='Success', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music2.mov", songImage="https://cdn.wallpapersafari.com/29/99/1P4jUK.jpg")
    song7 = Song(title='spirit', genre="Pop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music3.mov", songImage="https://i.pinimg.com/564x/51/0e/8f/510e8f9aa9628536c02ec45561ab5f2d.jpg")
    song8 = Song(title='Jazzi', genre="edm", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music1.mov", songImage="https://i.pinimg.com/736x/b7/81/e5/b781e5ac39130a4f5233ec8e0895dcc3.jpg")
    song9 = Song(title='Kind', genre="edm", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music2.mov", songImage="https://i1.sndcdn.com/artworks-50bMWp1EL2rhGIqe-iLOHyQ-t240x240.jpg")
    song10 = Song(title='Land', genre="edm", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music3.mov", songImage="https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?cs=srgb&dl=pexels-bruno-thethe-1910225.jpg&fm=jpg")
    song11 = Song(title='Will', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music1.mov", songImage="https://i0.wp.com/illustrationchronicles.com/wp-content/uploads/2020/10/1_1939_Steinweiss_Imperial-OrchestraUnderRichRodgers_1500.jpg")
    song12 = Song(title='Season', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music2.mov", songImage="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-hands-in-the-air-musical-notes-032322.jpg")
    song13 = Song(title='Mood', genre="Rock", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/music3.mov", songImage="https://b1709934.smushcdn.com/1709934/wp-content/uploads/2021/07/Copy-of-800-x-500-Blog-Post-4-4.jpg")

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
