from flask import Blueprint, jsonify, request
from markupsafe import escape
from sqlalchemy import or_, and_


from models.journey import Journey
from models.park import Park

from __init__ import db

journeys = Blueprint('journeys', __name__)





@journeys.post('/add-journey', strict_slashes=False)
def add_journey():
    """
    the endpoint to add a journey
    the json expects the following args:
        name, from_park_id, to_park_id, price, time (morning || noon || night), company_id
        whereby [name, from_park_id, to_park_id, time, company_id] are compulsory
    """
    data = request.json

    name = data.get('name')
    from_park_id = data.get('from_park_id')
    to_park_id = data.get('to_park_id')
    price = data.get('price', 0)
    time = data.get('time')
    company_id = data.get('company_id')


    if not name or not from_park_id or not to_park_id or not time or not company_id:
        return jsonify({"msg": "missing data [name, from_park_id, to_park_id, time, company_id]"}), 400

    if time not in ["morning", "noon", "night"]:
        return jsonify({"msg": "time must be morning || noon || night"}), 400

    journey = Journey(name, from_park_id, to_park_id, price, time, company_id)

    db.session.add(journey)
    db.session.commit()

    new_journey = db.session.get(Journey, journey.id).to_dict()
    return jsonify({"data": new_journey}), 201

@journeys.get("/journey/<journey_id>")
def get_journey(journey_id):
    """
    returs all details about a journey
    """
    journey = db.session.get(Journey, escape(journey_id))
    if journey:
        response = journey.to_dict()
        return jsonify({"data": response})
    else:
        return jsonify({"msg": "Journey Not Found"}), 404


@journeys.get("/journeys_search")
def get_journeys_based_on_query():
    """
    returns all journeys that meet the search criteria
    json expects [from_state, from_lga, from_town, to_state]
    where only [from_state, to_state] are compulsory
    """
    data = request.json

    from_state = data.get('from_state')
    from_lga = data.get('from_lga', 'nothing')
    from_town = data.get('from_town', 'nothing')
    to_state = data.get('to_state')

    if not from_state or not to_state:
        return jsonify({"error": "Missing data [from_state, to_state]"}), 400
    

    journeys = db.session.query(Journey).join(Park, Journey.from_park_id == Park.id).filter(
        or_(
            and_(
                Journey.from_park.has(Park.town == from_town.lower()),
                Journey.to_park.has(Park.state == to_state.lower())
            ),
            and_(
                Journey.from_park.has(Park.lga == from_lga.lower()),
                Journey.to_park.has(Park.state == to_state.lower())
            ),
            and_(
                Journey.from_park.has(Park.state == from_state.lower()),
                Journey.to_park.has(Park.state == to_state.lower())
            )
        )
    ).distinct().all()
    if not journeys:
        return {"msg": "No journey for your current location at the moment"}

    all_journs = []

    for journey in journeys:
        journ_dict = journey.to_dict()
        park_obj = {
            'from': {
                'park_id': journey.from_park_id,
                'address': journey.from_park.address,
                'name': journey.from_park.name,
                'lga': journey.from_park.lga,
                'town': journey.from_park.town
            },
            'to': {
                'park_id': journey.to_park_id,
                'address': journey.to_park.address,
                'name': journey.to_park.name,
                'lga': journey.to_park.lga,
                'town': journey.to_park.town
            }
        }

        journ_dict['parks_info'] = park_obj
        del journ_dict['from_park_id']
        del journ_dict['to_park_id']

        comp_obj = {
            'name': journey.company.name,
            'id': journey.company_id
        }
        journ_dict['company_info'] = comp_obj
        del journ_dict['company_id']

        all_journs.append(journ_dict)
        
    return jsonify({"data": all_journs})