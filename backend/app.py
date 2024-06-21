from models.company import Company
from models.park import Park
from models.user import User
from models.journey import Journey
from flask import jsonify

#########   import routes from their individual blueprints  #########
from routes.companies import companies
from routes.parks import parks
from routes.journeys import journeys
from routes.users import users
from routes.tickets import tickets


from __init__ import app, db


# register blueprints
app.register_blueprint(companies)
app.register_blueprint(parks)
app.register_blueprint(journeys)
app.register_blueprint(users)
app.register_blueprint(tickets)


@app.errorhandler(404)
def not_found(error):
    """This Handles any 404 error"""
    return jsonify({"error": str(error.name)}), 404


@app.route("/")
def index():
    """
    This returns all companies, parks, journeys and users.
    """
    companies = db.session.query(Company).all()
    parks = db.session.query(Park).all()
    journeys = db.session.query(Journey).all()
    users = db.session.query(User).all()

    all_comps = [company.to_dict() for company in companies]
    all_parks = [park.to_dict() for park in parks]
    all_journeys = [journey.to_dict() for journey in journeys]
    all_users = [user.to_dict() for user in users]

    response = {
        'companies': all_comps,
        'parks': all_parks,
        'journeys': all_journeys,
        'users': all_users
    }
    return jsonify({'data': response})


if __name__ == "__main__":
    app.run("0.0.0.0", 5000)
