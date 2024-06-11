from models.base_model import Base, BaseModel
from sqlalchemy import String, Column, ForeignKey


class Park(BaseModel,Base):

    __tablename__ = "parks"

    state = Column('state', String(100))
    city = Column('city', String(100))
    area = Column('area', String(100))
    address = Column('address', String(200))
    company_id = Column('company_id', ForeignKey('companies.id'))

    def __init__(self, name: str, state: str, city: str, area: str, address: str, company_id: str) -> None:
        super().__init__(name)
        self.state = state
        self.city = city
        self.area = area
        self.address = address
        self.company = company_id
