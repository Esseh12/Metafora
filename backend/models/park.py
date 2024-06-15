from models.base_model import Base, BaseModel
from sqlalchemy import String, Column, ForeignKey
# from sqlalchemy.orm import relationship


class Park(BaseModel,Base):

    __tablename__ = "parks"

    state = Column('state', String(50), nullable=False)
    lga = Column('lga', String(50), nullable=False)
    town = Column('town', String(50))
    address = Column('address', String, nullable=False)
    company_id = Column('company_id', String(100), ForeignKey('companies.id'))
    # routes = relationship('Route', backref='park')

    def __init__(self, name, state, lga, town, address, company_id):
        super().__init__(name)
        self.state = state
        self.lga = lga
        self.town = town
        self.address = address
        self.company_id = company_id
