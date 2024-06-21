from flask import Blueprint, jsonify, request
from markupsafe import escape
from sqlalchemy.exc import IntegrityError

from models.ticket import Ticket
from __init__ import db

tickets = Blueprint('tickets', __name__)



# @tickets.post('/tickets/create', strict_slashes=False)
# def get_all_companies():
#     """
#     this returns companies in our database
#     """
#     companies = db.session.query(Company).all()
#     serializable_companies = [company.to_dict() for company in companies]
#     data = {"companies": serializable_companies}
#     response = jsonify({"data": data})
#     return response


# @companies.get('/company/<id>', strict_slashes=False)
# def get_company(id):
#     """
#     this returns a company
#         - all information about a company
#         and the parks associated with the company
#     """
#     company = db.session.get(Company, escape(id))
#     if company:            
#         serializable_company = company.to_dict()

#         if company.parks:
#             parks = [cp.to_dict() for cp in company.parks]
#             serializable_company.update({"parks" : parks})

#         return jsonify({"data": serializable_company})
#     else:
#         return jsonify({"msg": "Company Not Found"}), 404

#  def __init__(self, name, passenger_id, journey_id, seat_number, price):


@tickets.post('/tickets/create', strict_slashes=False)
def create_ticket():
    """
    the endpoint to add a ticket.
    the json expects the following args:
    name, passenger_id, journey_id, seat_number, price
        whereby only seat_number is not compulsory
    """
    data = request.json

    name = data.get('name')
    passenger_id = data.get('passenger_id')
    journey_id = data.get('journey_id')
    seat_number = data.get('seat_number')
    price = data.get('price')

    if not name or not passenger_id or not journey_id or not price:
        return jsonify({"error": "Missing data [name, passenger_id, journey_id, price]"}), 400
    
    ticket = Ticket(name, passenger_id, journey_id, price, seat_number)
    db.session.add(ticket)
    db.session.commit()

    new_ticket = db.session.get(Ticket, ticket.id).to_dict() 
    return jsonify({"data": new_ticket}), 201

