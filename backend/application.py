from backend.models import Company
from backend.models import Park
from backend.models import User, TokenBlockList
from backend.models import Journey
from backend.models import Ticket
from flask import jsonify
from os import environ

#########   import routes from their individual blueprints  #########
from backend.routes import companies
from backend.routes import parks
from backend.routes import journeys
from backend.routes import users
from backend.routes import tickets


from backend.__init__ import app, db, jwt


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

@jwt.token_in_blocklist_loader
def token_in_blocklist(jwt_header, jwt_data):
    """ this check if the token is in the blocklist
    if true, it revokes the token
    useful for logout implementation
    """
    jti = jwt_data['jti']

    token = db.session.query(TokenBlockList).filter_by(jti=jti).scalar()

    return token is not None


@app.route("/")
def index():
    """
    This returns all companies, parks, journeys and users.
    """
    companies = db.session.query(Company).all()
    parks = db.session.query(Park).all()
    journeys = db.session.query(Journey).all()
    users = db.session.query(User).all()
    tickets = db.session.query(Ticket).all()

    all_comps = [company.to_dict() for company in companies]
    all_parks = [park.to_dict() for park in parks]
    all_journeys = [journey.to_dict() for journey in journeys]
    all_users = [user.to_dict() for user in users]
    all_tickets = [ticket.to_dict() for ticket in tickets]


    response = {
        'companies': all_comps,
        'parks': all_parks,
        'journeys': all_journeys,
        'users': all_users,
        'tickets': all_tickets
    }
    return jsonify({'data': response})


if __name__ == "__main__":
    app.run("0.0.0.0", environ.get('PORT'))
