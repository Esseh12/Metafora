from models.base_model import Base, BaseModel
from sqlalchemy import String, Column, ForeignKey
# from sqlalchemy.orm import relationship


class Park(BaseModel,Base):

    __tablename__ = "parks"

    state = Column('state', String(100))
    lga = Column('lga', String(100))
    town = Column('town', String(100))
    address = Column('address', String(200))
    company_id = Column('company_id', ForeignKey('companies.id'))
    # routes = relationship('Route', backref='park')

    def __init__(self, name: str, state: str, lga: str, town: str, address: str, company_id: str) -> None:
        super().__init__(name)
        self.state = state
        self.lga = lga
        self.town = town
        self.address = address
        self.company_id = company_id
