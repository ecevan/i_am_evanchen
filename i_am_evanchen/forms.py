from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired, Length


class ChatBoxForm(FlaskForm):
    message = StringField("Message",
                          validators=[DataRequired(), Length(min=1, max=200)],
                          default="")
    submit = SubmitField('\U0001F680')
