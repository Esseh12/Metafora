from models.base_model import BaseModel, Base
from sqlalchemy import Float, Integer, String, Column, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime



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


    def __init__(self, name, passenger_id, journey_id, price, seat_number=None):
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
