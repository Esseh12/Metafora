from uuid import uuid4
"""
This modulue contain the BaseModel class that every other
model inherit from
"""


class BaseModel:
    def __init__(self, name) -> None:
        self.id = str(uuid4())
        self.name = name

    def __str__(self) -> str:
        return f"{self.__class__.__name__}.{self.id}"
