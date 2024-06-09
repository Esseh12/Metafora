from models.base_model import BaseModel



class User(BaseModel):
    def __init__(self, name: str, email: str, display_pic_url: str, role: str='passenger') -> None:
        super().__init__(name)
        self.email = email
        self.role = role
        self.pic_url = display_pic_url
