from uuid import uuid4
from datetime import datetime
"""
This modulue contain the BaseModel class that every other
model inherit from
"""


class BaseModel:
    def __init__(self, name: str) -> None:
        self.id = str(uuid4())
        self.name = name
        self.created: datetime = datetime.now()
        self.updated: datetime = self.created

    def __str__(self) -> str:
        return f"{self.__class__.__name__}.{self.id}"
