from uuid import uuid4
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Integer, String, Column, DateTime
"""
This modulue contain the BaseModel class that every other
model inherit from
"""
class Base(DeclarativeBase):
    ...
# db = SQLAlchemy(model_class=Base)

class BaseModel:
    id = Column('id', String(100), primary_key=True)
    name = Column('name', String(100), nullable=False)
    created = Column('created', DateTime)
    updated = Column('updated', DateTime)
    
    def __init__(self, name: str) -> None:
        self.id = str(uuid4())
        self.name = name
        self.created: datetime = datetime.now()
        self.updated: datetime = self.created

    def __str__(self) -> str:
        return f"{self.__class__.__name__}.{self.id}"
    
    def to_dict(self):
        """return json serializable format for the class object"""
        ds = {k:v for k,v in self.__dict__.items() if not k.startswith('_')}
        ds['created'] = str(ds['created'])
        ds['updated'] = str(ds['updated'])
        return ds
