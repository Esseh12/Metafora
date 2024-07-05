from backend.models.base_model import Base, BaseModel
from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship


class Journey(BaseModel, Base):

    __tablename__ = "journeys"

    from_park_id = Column('from_park_id', ForeignKey('parks.id'), nullable=False)
    to_park_id = Column('to_park_id', ForeignKey("parks.id"), nullable=False)
    price = Column('price', Integer, default=0)
    time = Column('time', String(50), nullable=False)
    company_id = Column('company_id', ForeignKey('companies.id'), nullable=False)
    
    from_park = relationship('Park', foreign_keys=[from_park_id], backref='journeys_from')
    to_park = relationship('Park', foreign_keys=[to_park_id], backref='to_journeys')

    # company = relationship('Company', foreign_keys=[company_id])

    
    def __init__(self, name, from_park_id, to_park_id, price, time, company_id):
        super().__init__(name)
        self.from_park_id = from_park_id
        self.to_park_id = to_park_id
        self.price = price
        self.time = time  # time ["morning", "noon", "night"]
        self.company_id = company_id

        # self.from_state = from_state
        # self.from_lga = from_lga
        # self.from_town = from_town

        # self.to_state = to_state
        # self.to_lga = to_lga
        # self.to_town = to_town
