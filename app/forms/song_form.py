from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired, Length
from app.api.awsS3 import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):

    title = StringField("title", validators=[DataRequired(), Length(1, 255, "Max Length for Title is 255 characters")])
    genre = StringField("genre", validators=[DataRequired()])
    # songUrl = StringField("songUrl", validators=[DataRequired()])
    songUrl = FileField("songUrl", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    songImage = StringField("songImage", validators=[FileAllowed(["pdf", "png", "jpg", "jpeg", "gif"])])
    submit = SubmitField("Submit")
