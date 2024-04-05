from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired, Length
from app.api.awsS3 import ALLOWED_EXTENSIONS

class PlayListForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(-1, 255, "Max Length for Title is 255 characters")])
    playListImage = StringField("playListImage", validators=[FileAllowed(["pdf", "png", "jpg", "jpeg", "gif"])])
    submit = SubmitField("Submit")
