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
        self.created = datetime.now()
        self.updated = self.created

    def __str__(self) -> str:
        return f"{self.__class__.__name__}.{self.id}"
    
    def to_dict(self):
        """return json serializable format for the class object"""
        new_dict = self.__dict__.copy()
        if "created" in new_dict:
            new_dict['created'] = new_dict['created'].strftime("%Y-%m-%dT%H:%M:%S.%f")

        if "updated" in new_dict:
            new_dict['updated'] = new_dict['updated'].strftime("%Y-%m-%dT%H:%M:%S.%f")

        # if "purchase_date" in new_dict:
        #     new_dict['updated'] = new_dict['updated'].strftime("%Y-%m-%dT%H:%M:%S.%f")

        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        return new_dict
