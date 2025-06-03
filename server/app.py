#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User

# Views go here!
class Signup(Resource):

    def post(self):
        json = request.get_json()

        if 'username' not in json or 'password' not in json:
            return {'error':'Username and password are requried.'}, 400

        try:
            user = User(
                username=json['username']
            )
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

api.add_resource(Signup, '/signup', endpoint='signup')


if __name__ == '__main__':
    app.run(port=5555, debug=True)