from models.base_model import BaseModel



class Route(BaseModel):
    def __init__(self, name, from_park_id, to_park_id, price, time, company_id) -> None:
        super().__init__(name)
        self.from_park_id = from_park_id
        self.to_park_id = to_park_id
        self.price = price
        self.time = time  # time ["morning", "noon", "night"]
        self.company = company_id
