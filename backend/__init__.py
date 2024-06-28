from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from backend.models.base_model import Base
from flask_migrate import Migrate
from os import environ
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail, Message # for email


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db4.sqlite"
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db2.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
app.config['MAIL_SERVER'] = environ.get('MAIL_SERVER')
app.config['MAIL_PASSWORD'] = environ.get('MAIL_PASSWORD')
app.config['MAIL_USERNAME'] = environ.get('MAIL_USERNAME')
app.config['MAIL_PORT'] = environ.get('MAIL_PORT')
# app.config['MAIL_USE_SSL'] = environ.get('MAIL_USE_SSL')
# app.config['MAIL_USE_TLS'] = environ.get('MAIL_USE_TLS')


app.secret_key = environ.get('JWT_SECRET_KEY')   # needed for session or jwt to work

CORS(app)
db = SQLAlchemy(app, model_class=Base)
jwt = JWTManager(app)
mail = Mail(app)



migrate = Migrate(app, db)


with app.app_context():
    db.create_all()
