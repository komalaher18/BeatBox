from app.models import db, Song, Playlist, environment, SCHEMA
from sqlalchemy.sql import text
from .songs import Song

def seed_playlistsongs():
    song1 = Song(title='Walkman', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/0f2f-d109-4d17-a500-9b3984c7c8f0.mp3", songImage="https://i1.sndcdn.com/artworks-TTc9R3VM8y0aRNf2-pWA79w-t240x240.jpg")
    song2 = Song(title='Lights', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/5efa-93ab-4ae2-9267-f1681c317f6e.mp3", songImage="https://i1.sndcdn.com/avatars-3NUCuSaZ69YQaemi-VsuBTQ-t240x240.jpg")
    song3 = Song(title='JingleBells', genre="Hip-hop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/acc3-e296-46ae-85e1-877ce355e394.mp3", songImage="https://i1.sndcdn.com/avatars-UShkzO4J2rhdHZJg-k7rawQ-t240x240.jpg")
    song4 = Song(title='Dark', genre="Hip-hop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/09ce-6e93-42ed-a98f-700e6a0d4daf.mp3", songImage="https://i1.sndcdn.com/artworks-000098273850-taolqs-t500x500.jpg")
    song5 = Song(title='Clean', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/4b84-8102-4102-9fc9-5fa60b9450ba.mp3", songImage="https://cdn.wallpapersafari.com/40/70/tR60ij.jpg")
    song6 = Song(title='Success', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/99ce-be1a-451d-9069-4cff7e98324d.mp3", songImage="https://cdn.wallpapersafari.com/29/99/1P4jUK.jpg")
    song7 = Song(title='Spirit', genre="Pop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/f3f8-de82-476d-963d-9091dd120bf4.mp3", songImage="https://i.pinimg.com/564x/51/0e/8f/510e8f9aa9628536c02ec45561ab5f2d.jpg")
    song8 = Song(title='Jazzi', genre="edm", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/7df5-a26d-44ce-9eb4-46da3a9c0ac8.mp3", songImage="https://i.pinimg.com/736x/b7/81/e5/b781e5ac39130a4f5233ec8e0895dcc3.jpg")
    song9 = Song(title='Kind', genre="edm", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/6149-386e-43bc-9d88-f9e2518fd95c.mp3", songImage="https://i1.sndcdn.com/artworks-50bMWp1EL2rhGIqe-iLOHyQ-t240x240.jpg")
    song10 = Song(title='Land', genre="edm", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/b36c-0888-49e5-aec7-fbab34b090b7.mp3", songImage="https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?cs=srgb&dl=pexels-bruno-thethe-1910225.jpg&fm=jpg")
    song11 = Song(title='Will', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/17f8-ec94-4edf-adcb-769f2cdecd0b.mp3", songImage="https://i0.wp.com/illustrationchronicles.com/wp-content/uploads/2020/10/1_1939_Steinweiss_Imperial-OrchestraUnderRichRodgers_1500.jpg")
    song12 = Song(title='Season', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/aad1-a885-4f98-97d1-ee546b2e9ac8.mp3", songImage="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-hands-in-the-air-musical-notes-032322.jpg")
    song13 = Song(title='Mood', genre="Rock", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/f839-fc6b-4da1-8c2b-e4741b622182.mp3", songImage="https://b1709934.smushcdn.com/1709934/wp-content/uploads/2021/07/Copy-of-800-x-500-Blog-Post-4-4.jpg")

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

    playlist1 = Playlist(userId='1',title='Love', playListImage="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149562217/original/fc77d96de1229ad6ca6f83289fd2d4b4c068a568/make-album-and-song-covers.jpg")
    playlist2 = Playlist(userId='1',title='Mood', playListImage="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/191396514/original/9f5cfeb256a038703341836d1288c37256d5bac3/create-your-music-artwork-cover-art-album-art.jpg")
    playlist3 = Playlist(userId='2',title='Walkman', playListImage="https://media.istockphoto.com/id/1203512641/photo/the-mockup-template-with-the-new-vinyl-disc-on-color-surface-music-album-cover-design.jpg")

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)


    song1.playlists.extend([playlist1, playlist2])
    song2.playlists.extend([playlist1, playlist2, playlist3])
    song3.playlists.extend([playlist1, playlist3])
    song4.playlists.extend([playlist1, playlist2])
    song5.playlists.extend([playlist1])
    song6.playlists.extend([playlist1])
    song7.playlists.extend([playlist1, playlist2])
    song8.playlists.extend([playlist1])
    song9.playlists.extend([playlist1])
    song10.playlists.extend([playlist1, playlist2])
    song11.playlists.extend([playlist1, playlist3])
    song12.playlists.extend([playlist1, playlist3])
    song13.playlists.extend([playlist1, playlist2])


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlistsongs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlistsongs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
