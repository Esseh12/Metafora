from models.base_model import BaseModel



class Park(BaseModel):
    def __init__(self, name, state, city, area, address, company_id) -> None:
        super().__init__(name)
        self.state = state
        self.city = city
        self.area = area
        self.address = address
        self.company = company_id
