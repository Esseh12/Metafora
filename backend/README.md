
If youre not already in the backend directory, changeintothe directory uing the command below

```cd backend/```

then run the `python3 app.py` to start the flask app

it will start the app on localhost:5000

below are the current endpoints to use

GET /companies
        this returns a json object of all companies onboarded to our platform

POST /companies

        adds a company to the list. using the json object
        { name, email, tagline, description, pic_url whereby name and email are compulsory }

GET /company/<id>

        return a company that match the id

POST /add-park

        adds a park,the json expects the following args:
        name, state, lga(local gov area), town, address, company_id
        whereby [name, state, lga, address] are compulsory

GET /parks/<park_id>

        returns a park that match the park_id

POST /add-journey

        add a journey, the json expects the following args:
        name, from_park_id, to_park_id, price, time (morning || noon || night), company_id
        whereby [name, from_park_id, to_park_id, time, company_id] are compulsory

GET /journey/<journey_id>

        returns a journey with the id 

GET /journeys_search

        returns all journeys that meet the search criteria json expects
        [from_state, from_lga, from_town, to_state] where only [from_state, to_state] are compulsory


POST /register
        create a user to the database
        json expects name, email, password, pic_url. The fields below are compulsory
        [name || email || password]

POST /login
    login a user, here a pair of jwt tokens are created
    email and password are required for json

GET /profile
    logged in user details returned

remember to include the access tokens to the authorization bearer or header where neccesary
