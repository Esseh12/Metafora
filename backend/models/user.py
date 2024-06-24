from backend.models.base_model import Base, BaseModel
from sqlalchemy import String, Column



class User(BaseModel, Base):

    __tablename__ =  "users"

    email = Column('email', String(100), unique=True, nullable=False)
    password = Column('password', String, nullable=False)

    role = Column('role', String(50), default='user')
    pic_url = Column('pic_url', String(200))
    
    def __init__(self, name, email, password, pic_url='no_url'):
        super().__init__(name)
        self.email = email
        self.password = password
        self.pic_url = pic_url
