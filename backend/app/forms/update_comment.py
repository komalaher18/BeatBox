from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired

class UpdateCommentForm(FlaskForm):
    commentBody = TextAreaField('Comment', validators=[DataRequired()])
    submit = SubmitField('Update Comment')
