from models.base_model import BaseModel



class Company(BaseModel):
    def __init__(self, name, company_email, tagline, description, display_pic_url) -> None:
        super().__init__(name)
        self.email = company_email
        self.tagline = tagline
        self.description = description
        self.pic_url = display_pic_url

