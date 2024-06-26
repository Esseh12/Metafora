from backend.models.base_model import Base, BaseModel
from sqlalchemy import String, Column, Integer,  Enum, ForeignKey, DateTime
from datetime import datetime



class User(BaseModel, Base):

    __tablename__ = "users"

    email = Column('email', String(100), unique=True, nullable=False)
    password = Column('password', String, nullable=False)

    role = Column('role', String, Enum('user', 'admin', 'company_rep'), default='user')
    # company_id = Column('company_id', ForeignKey('companies.id'))
    pic_url = Column('pic_url', String(200))
    
    def __init__(self, name, email, password, pic_url='no_url'):
        super().__init__(name)
        self.email = email
        self.password = password
        self.pic_url = pic_url


class TokenBlockList(Base):
    __tablename__ = "tokenblocklist"

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    jti = Column('jti', String)
    created_at = Column('created_at', DateTime, default=datetime.now())
