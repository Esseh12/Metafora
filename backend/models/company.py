from backend.models.base_model import BaseModel, Base
from sqlalchemy import String, Column
from sqlalchemy.orm import relationship


class Company(BaseModel, Base):

    __tablename__ = "companies"

    email = Column('email', String(100), unique=True, nullable=False)
    tagline = Column('tagline', String(200), default='no tagline')
    description = Column('description', String(200), default='no discription')
    pic_url = Column('pic_url', String(200), default='default')
    unique_code = Column('unique_code', String(3), unique=True)
    
    parks = relationship('Park', backref='company')
    journeys = relationship('Journey', backref='company')

    def __init__(self, name, email, unique_code, tagline, description, pic_url):
        """initialize Company model"""
        super().__init__(name)
        self.email = email
        self.unique_code = unique_code
        self.tagline = tagline
        self.description = description
        self.pic_url = pic_url
