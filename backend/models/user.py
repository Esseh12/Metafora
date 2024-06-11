from models.base_model import Base, BaseModel



class User(BaseModel, Base):
    def __init__(self, name: str, email: str, display_pic_url: str, role: str='passenger') -> None:
        super().__init__(name)
        self.email = email
        self.role = role
        self.pic_url = display_pic_url
