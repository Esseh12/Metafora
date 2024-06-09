from models.company import Company
from models.park import Park
from models.user import User
from models.route import Route

comp = Company("Guo", "guo@gm.com", "we move", "many many things", "www.img.com/dfghj")


park1 = Park('penciema park', 'lagos', 'Agege', 'pencinema', '10 old abeokuta rd,pencinema agage, lagos', comp.id)
park2 = Park('baju park', 'Kano', 'fagge', 'bajulaiye', '1780 old rd,Kano', comp.id)

user1 = User('imole', 'imo@d.dev', '32.com/ims')
route1 = Route('Lagos to Uyo', park1.id, park2.id, 8700, 'night', comp.id)


print(route1.__dict__)

# print(user1.__dict__)
# user1.role = 'admin'
# print(user1.__dict__)
# print(park1.__dict__)
# print(comp)
# print(park1)

