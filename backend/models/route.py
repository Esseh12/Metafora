from models.base_model import Base, BaseModel
from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship


class Route(BaseModel, Base):

    __tablename__ = "routes"

    from_park_id = Column('from_park', ForeignKey('parks.id'))
    to_park_id = Column('to_park', ForeignKey("parks.id"))
    price = Column('price', Integer)
    time = Column('time', String(50))
    company_id = Column('company_id', ForeignKey('companies.id'))

    from_park = relationship('Park', foreign_keys=[from_park_id], backref='routes_from')
    to_park = relationship('Park', foreign_keys=[to_park_id], backref='to_routes')
    
    def __init__(self, name: str, from_park_id: str, to_park_id: str, price: int, time: str, company_id: str) -> None:
        super().__init__(name)
        self.from_park_id = from_park_id
        self.to_park_id = to_park_id
        self.price = price
        self.time = time  # time ["morning", "noon", "night"]
        self.company_id = company_id
