from models.base_model import Base, BaseModel
from sqlalchemy import String, Column



class User(BaseModel, Base):

    __tablename__ =  "users"

    email = Column('email', String(100), unique=True, nullable=False)
    role = Column('role', String(50))
    pic_url = Column('pic_url', String(200))
    
    def __init__(self, name: str, email: str, display_pic_url: str, role: str='passenger') -> None:
        super().__init__(name)
        self.email = email
        self.role = role
        self.pic_url = display_pic_url
