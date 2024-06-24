from flask import Blueprint, jsonify, request, session
from markupsafe import escape
from sqlalchemy.exc import IntegrityError

from backend.models.company import Company
from backend.__init__ import db

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
    if 'user' not in session:
        return jsonify({"error": "Not Authorized"}),401
    
    if session['user']['role'] != 'admin':
        return jsonify({"error": "Not Authorized, must be an admin"}),401
    
    data = request.json

    name = data.get('name')
    email = data.get('email')
    unique_code = data.get('unique_code')
    tagline = data.get('tagline')
    description = data.get('description')
    pic_url = data.get('pic_url')

    if not name or not email or not unique_code:
        return jsonify({"error": "Missing data [name || email || unique_code]"}), 400
    
    try:
        comp = Company(name, email, unique_code, tagline, description, pic_url)
        db.session.add(comp)
        db.session.commit()
    except IntegrityError:
        return jsonify({"error": "email exists"}), 400

    new_comp = db.session.get(Company, comp.id).to_dict() 
    return jsonify({"data": new_comp}), 201


@companies.put('/company/<company_id>', strict_slashes=False)
def update_company(company_id):
    """
    This Endpoint is to updates the company.
    Expected Args:
        name, email: compulsory
        tagline, 
    """
    comp = db.session.get(Company, escape(company_id))
    if not comp:
        return jsonify({"error": "Not found"}), 404
    
    data = request.json
    attribute = ["name", "tagline", "description", "pic_url"]

    for key, value in data.items():
        if key in attribute:
            setattr(comp, key, value)

    db.session.commit()
    updated_comp = db.session.get(Company, escape(company_id))
    new_comp = updated_comp.to_dict()
    new_data = {
        "Company": new_comp
    }
    return jsonify({"data": new_data}), 201


@companies.delete("/company/<company_id>", strict_slashes=False)
def delete_company(company_id):
    """
    This method is to delete a company
    Args:
        company_id
    """
    comp = db.session.get(Company, escape(company_id))
    if not comp:
        return jsonify({"error": "Not found"}), 404
    
    db.session.delete(comp)
    db.session.commit()
    return jsonify({"msg": "Deleted Successfully"})