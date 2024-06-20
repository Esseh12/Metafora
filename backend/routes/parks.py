from flask import Blueprint, jsonify, request
from markupsafe import escape

from models.park import Park
from __init__ import db

parks = Blueprint('parks', __name__)

@parks.post('/add-park', strict_slashes=False)
def add_park():
    """
    the endpoint to add a park
    the json expects the following args:
        name, state, lga(local gov area), town, address, company_id
        whereby [name, state, lga, address] are compulsory
    """
    data = request.json

    name = data.get('name')
    state = data.get('state')
    lga = data.get('lga')
    town = data.get('town', None)
    address = data.get('address')
    company_id = data.get('company_id', None)

    if not name or not state or not lga or not address:
        return jsonify({"error": "Missing data [name, state, lga, address]"}), 400

    park = Park(name, state, lga, town, address, company_id)

    db.session.add(park)
    db.session.commit()

    new_park = db.session.get(Park, park.id).to_dict() 
    return jsonify({"data": new_park}), 201


@parks.get('/parks/<park_id>', strict_slashes=False)
def get_park(park_id):
    """
    returns a park
    """
    obj = db.session.get(Park, escape(park_id))
    if obj:
        new_obj  = obj.to_dict()
        new_obj.update({"company" : obj.company.to_dict()})
        data = {
            "Park" : new_obj
        }

        return jsonify({"data": data})
    return jsonify({"error": 'Not found'}), 404


@parks.put('/parks/<park_id>', strict_slashes=False)
def update_park(park_id):
    """
    update a park
    """
    obj = db.session.get(Park, escape(park_id))
    if not obj:
        return jsonify({"error": 'Not found'}), 404
    data = request.json
    
    # if 'company_id' in data.keys():
    #     return jsonify({"error": "Can't update company_id"}), 400

    for k, v in data.items():
        if k in ['name', 'state', 'lga', 'town', 'address']:
            setattr(obj, k, v)
    
    db.session.commit()

    updated_obj = db.session.get(Park, escape(park_id))
    new_obj  = updated_obj.to_dict()
    new_obj.update({"company" : updated_obj.company.to_dict()})
    new_data = {
        "Park" : new_obj
    }

    return jsonify({"data": new_data})
    

    # 8028301121
    # palmpay