from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(title='Walkman', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/0f2f-d109-4d17-a500-9b3984c7c8f0.mp3", songImage="https://i1.sndcdn.com/artworks-TTc9R3VM8y0aRNf2-pWA79w-t240x240.jpg")
    song2 = Song(title='Lights', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/5efa-93ab-4ae2-9267-f1681c317f6e.mp3", songImage="https://i1.sndcdn.com/avatars-3NUCuSaZ69YQaemi-VsuBTQ-t240x240.jpg")
    song3 = Song(title='JingleBells', genre="Hip-hop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/acc3-e296-46ae-85e1-877ce355e394.mp3", songImage="https://i1.sndcdn.com/avatars-UShkzO4J2rhdHZJg-k7rawQ-t240x240.jpg")
    song4 = Song(title='Dark', genre="Hip-hop", userId='2',songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/acc3-e296-46ae-85e1-877ce355e394.mp3", songImage="https://i1.sndcdn.com/artworks-000098273850-taolqs-t500x500.jpg")
    song5 = Song(title='Clean', genre="Pop", userId='1',  songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/4b84-8102-4102-9fc9-5fa60b9450ba.mp3", songImage="https://cdn.wallpapersafari.com/40/70/tR60ij.jpg")
    song6 = Song(title='Success', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/99ce-be1a-451d-9069-4cff7e98324d.mp3", songImage="https://cdn.wallpapersafari.com/29/99/1P4jUK.jpg")
    song7 = Song(title='Spirit', genre="Pop", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/f3f8-de82-476d-963d-9091dd120bf4.mp3", songImage="https://i.pinimg.com/564x/51/0e/8f/510e8f9aa9628536c02ec45561ab5f2d.jpg")
    song8 = Song(title='Jazzi', genre="edm", userId='1',songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/b36c-0888-49e5-aec7-fbab34b090b7.mp3", songImage="https://i.pinimg.com/736x/b7/81/e5/b781e5ac39130a4f5233ec8e0895dcc3.jpg")
    song9 = Song(title='Kind', genre="edm", userId='1',songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/7df5-a26d-44ce-9eb4-46da3a9c0ac8.mp3", songImage="https://i1.sndcdn.com/artworks-50bMWp1EL2rhGIqe-iLOHyQ-t240x240.jpg")
    song10 = Song(title='Land', genre="edm", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/6149-386e-43bc-9d88-f9e2518fd95c.mp3", songImage="https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?cs=srgb&dl=pexels-bruno-thethe-1910225.jpg&fm=jpg")
    song11 = Song(title='Will', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/17f8-ec94-4edf-adcb-769f2cdecd0b.mp3", songImage="https://i0.wp.com/illustrationchronicles.com/wp-content/uploads/2020/10/1_1939_Steinweiss_Imperial-OrchestraUnderRichRodgers_1500.jpg")
    song12 = Song(title='Season', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/aad1-a885-4f98-97d1-ee546b2e9ac8.mp3", songImage="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-hands-in-the-air-musical-notes-032322.jpg")
    song13 = Song(title='Mood', genre="Rock", userId='2', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/f839-fc6b-4da1-8c2b-e4741b622182.mp3", songImage="https://b1709934.smushcdn.com/1709934/wp-content/uploads/2021/07/Copy-of-800-x-500-Blog-Post-4-4.jpg")
    song14 = Song(title='Night', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/78e5-4eba-46cd-ad2f-0d26f5a3a854.mp3", songImage="https://i.pinimg.com/originals/84/f7/1a/84f71af034d6c811f2198bea1565dab3.jpg")
    song15 = Song(title='Day', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/0639-91db-44c4-a740-24f4c42c1c73.mp3", songImage="https://wellnesscenter.uic.edu/wp-content/uploads/sites/100/2020/06/free-music-images-2.jpg")
    song16 = Song(title='Dream', genre="Hip-hop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/7206-f14c-4f2d-9783-5e0aad868ab7.mp3", songImage="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg")
    song17 = Song(title='Hope', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/9e4d-c584-415b-8dcb-ac10956284b2.mp3", songImage="https://images.pexels.com/photos/3139497/pexels-photo-3139497.jpeg?cs=srgb&dl=pexels-achraf210-3139497.jpg&fm=jpg")
    song18 = Song(title='Rise', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/407a-b087-4702-8d68-deeaee691c53.mp3", songImage="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg")
    song19 = Song(title='Sunny', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/ae73-6d95-4827-9fa9-f5b7d942d316.mp3", songImage="https://static.gettyimages.com/display-sets/creative-landing/images/GettyImages-1448734171.jpg")
    song20 = Song(title='Reason', genre="Rock", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/f81a-5f31-4499-a674-ff3522aa47f3.mp3", songImage="https://www.shutterstock.com/shutterstock/photos/2137606067/display_1500/stock-vector-free-your-mind-and-let-creativity-idea-and-imagination-fly-mindfulness-thinking-break-free-to-get-2137606067.jpg")
    song21 = Song(title='Climb', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/05aa-d383-4ca8-84ef-d197b26cb6da.mp3", songImage="https://www.w3schools.com/w3css/img_lights.jpg")
    song22 = Song(title='Shine', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/21b0-2135-40bb-95f6-1d24ebb37f35.mp3", songImage="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg")
    song23 = Song(title='Waves', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/cf24-1304-4f92-995d-73ffccdf7685.mp3", songImage="https://www.bnf.fr/sites/default/files/2019-10/btv1b8457904c_f1.jpg")
    song24 = Song(title='Mountain', genre="Pop", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/e0be-66c6-4671-8fa6-53390becc36d.mp3", songImage="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg")
    song25 = Song(title='Rest', genre="edm", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/3051-c890-4189-abee-a667dc826229.mp3", songImage="https://science.nasa.gov/wp-content/uploads/2023/06/webb-flickr-52259221868-30e1c78f0c-4k-jpg")
    song26 = Song(title='WaterFall', genre="edm", userId='1', songUrl="https://beatbox-audio.s3.us-east-2.amazonaws.com/f40c-c845-42d8-889d-f1ac1a0b78e9.mp3", songImage="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/3.jpg")



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
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)
    db.session.add(song21)
    db.session.add(song22)
    db.session.add(song23)
    db.session.add(song24)
    db.session.add(song25)
    db.session.add(song26)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
