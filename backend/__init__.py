from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from backend.models.base_model import Base
from backend.models import Base
# from backend.models.mail import Email
from backend.models import Email

from flask_migrate import Migrate
from os import environ
from flask_jwt_extended import JWTManager
from flask_cors import CORS



app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db4.sqlite"
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db2.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')

app.secret_key = environ.get('JWT_SECRET_KEY')   # needed for session or jwt to work



# ########### extensions used #####################

CORS(app)
db = SQLAlchemy(app, model_class=Base)
jwt = JWTManager(app)
# email = Email() # to be uncommented for email service

#################################################




migrate = Migrate(app, db)


with app.app_context():
    db.create_all()
