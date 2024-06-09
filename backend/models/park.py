from models.base_model import BaseModel



class Park(BaseModel):
    def __init__(self, name: str, state: str, city: str, area: str, address: str, company_id: str) -> None:
        super().__init__(name)
        self.state = state
        self.city = city
        self.area = area
        self.address = address
        self.company = company_id
