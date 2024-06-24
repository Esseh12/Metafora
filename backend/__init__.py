from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from backend.models.base_model import Base
from flask_migrate import Migrate


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db4.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db2.sqlite"

app.secret_key = 'test_secret'   # should coming from enviroment variable

db = SQLAlchemy(app, model_class=Base)

migrate = Migrate(app, db)
# m.init_app(app,db)


with app.app_context():
    db.create_all()
