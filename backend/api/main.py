from flask import Flask
from flask import jsonify, request, redirect, url_for
from uuid import uuid4






app = Flask(__name__)


@app.route("/api/", strict_slashes=False)
def api_index():
    """handles the index route"""
    data = {"message": "Welcome to index page"}
    return jsonify(data)


@app.route("/api/companies", methods=["GET", "POST"], strict_slashes=False)
def companies():
    """returns all companies onboarded on Metafora"""
    if request.method == 'GET':
        companies = Company.all()

        data = {"data": companies}
        return jsonify(data)
    elif request.method == "POST":
        data = request.json
        if 'name' not in data:
            return jsonify({"error":"name not provided"})
        if 'email' not in data:
            return jsonify({"error":"email not provided"})        
        nm = data['name']
        email = data['email']
        Company(nm, email)
        return redirect(url_for('companies', method='GET'))            



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
