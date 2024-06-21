from models.base_model import BaseModel, Base
from sqlalchemy import Float, Integer, String, Column, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime


# id = Column('id', String(100), primary_key=True)
#     name = Column('name', String(100), nullable=False)
#     created = Column('created', DateTime)
#     updated = Column('updated', DateTime)



class Ticket(BaseModel, Base):

    __tablename__ = "tickets"

    passenger_id = Column('passenger_id', String, ForeignKey('users.id'), nullable=False)

    journey_id = Column('journey_id', String, ForeignKey('journeys.id'), nullable=False)
    seat_number = Column('seat_number', Integer)
    price = Column('price', Float)
    purchase_date = Column('purchase_date', DateTime, default=datetime.now())
    payment_status = Column('payment_status', Enum('paid', 'unpaid'), default='paid')
    status = Column('status',Enum('booked', 'cancelled', 'checked-in'), default='booked')
    code = Column('code', String)

    journey = relationship('Journey')

    # email = Column('email', String(100), unique=True, nullable=False)
    # tagline = Column('tagline', String(200))
    # description = Column('description', String(200))
    # pic_url = Column('pic_url', String(200))
    # parks = relationship('Park', backref='company')
    # journeys = relationship('Journey', backref='company')

    def __init__(self, name, passenger_id, journey_id, seat_number, price):
        """initialize Ticket model"""
        super().__init__(name)
        self.passenger_id = passenger_id
        self.journey_id = journey_id
        self.seat_number = seat_number
        self.price = price
        self.code = self.getCode
    
    @property
    def getCode(self):
        """compute Ticket code using the unique company code"""
        company_code = self.journey.company.unique_code
        code = f"{company_code}-{datetime.now()}"
        return code
