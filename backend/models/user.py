from models.base_model import BaseModel



class Company(BaseModel):
    def __init__(self, name, email, bio, display_pic_url) -> None:
        super().__init__(name)
        self.email = email
        self.role = 'passenger'
        self.bio = bio
        self.pic_url = display_pic_url

