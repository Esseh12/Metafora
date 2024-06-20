from flask import Blueprint, jsonify, request
from markupsafe import escape
from sqlalchemy.exc import IntegrityError

from models.company import Company
from __init__ import db

companies = Blueprint('companies', __name__)



@companies.get('/companies', strict_slashes=False)
def get_all_companies():
    """
    this returns companies in our database
    """
    companies = db.session.query(Company).all()
    serializable_companies = [company.to_dict() for company in companies]
    data = {"companies": serializable_companies}
    response = jsonify({"data": data})
    return response


@companies.get('/company/<id>', strict_slashes=False)
def get_company(id):
    """
    this returns a company
        - all information about a company
        and the parks associated with the company
    """
    company = db.session.get(Company, escape(id))
    if company:            
        serializable_company = company.to_dict()

        if company.parks:
            parks = [cp.to_dict() for cp in company.parks]
            serializable_company.update({"parks" : parks})

        return jsonify({"data": serializable_company})
    else:
        return jsonify({"msg": "Company Not Found"}), 404


@companies.post('/companies', strict_slashes=False)
def add_company():
    """
    the endpoint to add a company
    the json expects the following args:
        name, email, tagline, description, pic_url
        whereby name and email are compulsory
    """
    data = request.json

    name = data.get('name')
    email = data.get('email')
    tagline = data.get('tagline', 'no tagline')
    description = data.get('description', 'no discription')
    pic_url = data.get('pic_url','no pic')

    if not name or not email:
        return jsonify({"error": "Missing data [name || email]"}), 400
    
    try:
        comp = Company(name, email, tagline, description, display_pic_url=pic_url)
        db.session.add(comp)
        db.session.commit()
    except IntegrityError:
        return jsonify({"error": "email exists"}), 400

    new_comp = db.session.get(Company, comp.id).to_dict() 
    return jsonify({"data": new_comp}), 201

