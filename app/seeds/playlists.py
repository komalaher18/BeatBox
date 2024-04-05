from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(userId='1',title='Love', playListImage="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149562217/original/fc77d96de1229ad6ca6f83289fd2d4b4c068a568/make-album-and-song-covers.jpg")
    playlist2 = Playlist(userId='1',title='Mood', playListImage="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/191396514/original/9f5cfeb256a038703341836d1288c37256d5bac3/create-your-music-artwork-cover-art-album-art.jpg")
    playlist3 = Playlist(userId='2',title='Walkman', playListImage="https://media.istockphoto.com/id/1203512641/photo/the-mockup-template-with-the-new-vinyl-disc-on-color-surface-music-album-cover-design.jpg")


    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
