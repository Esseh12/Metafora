from models.base_model import Base, BaseModel
from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship


class Route(BaseModel, Base):

    __tablename__ = "routes"

    from_park_id = Column('from_park_id', ForeignKey('parks.id'))
    to_park_id = Column('to_park_id', ForeignKey("parks.id"))
    price = Column('price', Integer)
    time = Column('time', String(50))
    company_id = Column('company_id', ForeignKey('companies.id'))
    
    from_state = Column('from_state', String(100))
    from_lga = Column('from_lga', String(100))
    from_town = Column('from_town', String(100))

    to_state = Column('to_state', String(100))
    to_lga = Column('to_lga', String(100))
    to_town = Column('to_town', String(100))

    from_park = relationship('Park', foreign_keys=[from_park_id], backref='routes_from')
    to_park = relationship('Park', foreign_keys=[to_park_id], backref='to_routes')
    
    def __init__(
            self, name: str, from_park_id: str, to_park_id: str, price: int,
            time: str, company_id: str, from_state: str, from_lga: str, from_town: str,
            to_state: str, to_lga: str, to_town: str
            ) -> None:
        super().__init__(name)
        self.from_park_id = from_park_id
        self.to_park_id = to_park_id
        self.price = price
        self.time = time  # time ["morning", "noon", "night"]
        self.company_id = company_id

        self.from_state = from_state
        self.from_lga = from_lga
        self.from_town = from_town

        self.to_state = to_state
        self.to_lga = to_lga
        self.to_town = to_town
