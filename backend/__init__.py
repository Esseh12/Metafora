from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models.base_model import Base



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db4.sqlite"

app.secret_key = 'test_secret'   # should coming from enviroment variable

db = SQLAlchemy(app, model_class=Base)


with app.app_context():
    db.create_all()
