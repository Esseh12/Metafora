from flask import Blueprint, jsonify, request
from markupsafe import escape

from flask_jwt_extended import jwt_required, get_jwt

from backend.models import Park
from backend.models import Company
from backend.__init__ import db

parks = Blueprint('parks', __name__)

@parks.post('/add-park', strict_slashes=False)
@jwt_required()
def add_park():
    """
    the endpoint to add a park
    the json expects the following args:
        name, state, lga(local gov area), town, address, company_id
        whereby [name, state, lga, address] are compulsory
    """
    if get_jwt()['sub']['role'] == 'user':
        return jsonify({"status": 401, "error": "Not Authorized, must be company_rep or admin"}),401

    data = request.json

    name = data.get('name')
    state = data.get('state')
    lga = data.get('lga')
    town = data.get('town', None)
    address = data.get('address')
    company_id = data.get('company_id', None)

    if not name or not state or not lga or not address:
        return jsonify({"status": 400, "error": "Missing data [name, state, lga, address]"}), 400
    

    # this is to make sure non-existing company_id is added to the database
    if company_id:
        if not db.session.get(Company, company_id):
            company_id = None

    park = Park(name, state, lga, town, address, company_id)

    db.session.add(park)
    db.session.commit()

    new_park = db.session.get(Park, park.id).to_dict() 
    return jsonify({"status": 201, "data": new_park}), 201


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
    return jsonify({"status": 404, "error": 'Not found'}), 404


@parks.put('/parks/<park_id>', strict_slashes=False)
@jwt_required()
def update_park(park_id):
    """
    update a park
    """
    if get_jwt()['sub']['role'] == 'user':
        return jsonify({"status": 401, "error": "Not Authorized, must be company_rep or admin"}),401

    obj = db.session.get(Park, escape(park_id))
    if not obj:
        return jsonify({"status": 404, "error": 'Not found'}), 404
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

    return jsonify({"status": 200, "data": new_data})


@parks.delete("/parks/<park_id>", strict_slashes=False)
@jwt_required()
def delete_park(park_id):
    """
    This Method deletes a park from database
    Args:
        park_id
    """
    if get_jwt()['sub']['role'] == 'user':
        return jsonify({"error": "Not Authorized, must be company_rep or admin"}),401

    park = db.session.get(Park, escape(park_id))
    if not park:
        return jsonify({"status": 404, "error": "Not found"}), 404
    db.session.delete(park)
    db.session.commit()

    return jsonify({"status": 200, "msg": "Park Sucessfully deleted!"})


@parks.get("/parks", strict_slashes=False)
def get_all_parks_state():
    """
    This Method returns a list of all states of available park from database
    """


    parks = db.session.query(Park).all()

    if not parks:
        return jsonify({"status": 404, "error": "Not parks"}), 404
    
    states = [park.state for park in parks]
    unique_states = list(set(states))
    # print(states)

    return jsonify({"status": 200, "data": unique_states})
