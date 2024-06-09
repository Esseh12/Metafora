from models.base_model import BaseModel



class Company(BaseModel):
    def __init__(self, name: str, company_email: str, tagline: str, description: str, display_pic_url: str) -> None:
        """initialize Company model"""
        super().__init__(name)
        self.email = company_email
        self.tagline = tagline
        self.description = description
        self.pic_url = display_pic_url

