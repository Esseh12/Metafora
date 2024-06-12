from models.base_model import BaseModel, Base
from sqlalchemy import String, Column


class Company(BaseModel, Base):

    __tablename__ = "companies"

    email = Column('email', String(100), unique=True)
    tagline = Column('tagline', String(200))
    description = Column('description', String(200))
    pic_url = Column('pic_url', String(200))

    def __init__(self, name: str, email: str, tagline: str, description: str, display_pic_url: str) -> None:
        """initialize Company model"""
        super().__init__(name)
        self.email = email
        self.tagline = tagline
        self.description = description
        self.pic_url = display_pic_url
