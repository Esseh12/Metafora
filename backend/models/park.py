from models.base_model import Base, BaseModel



class Park(BaseModel,Base):
    def __init__(self, name: str, state: str, city: str, area: str, address: str, company_id: str) -> None:
        super().__init__(name)
        self.state = state
        self.city = city
        self.area = area
        self.address = address
        self.company = company_id
