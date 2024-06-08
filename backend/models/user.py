from models.base_model import BaseModel



class Company(BaseModel):
    def __init__(self, name, email, display_pic_url, role='passenger') -> None:
        super().__init__(name)
        self.email = email
        self.role = role
        self.pic_url = display_pic_url
