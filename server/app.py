#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Spirit, Cocktail

# Views go here!
class Signup(Resource):

    def post(self):
        json = request.get_json()

        if 'username' not in json or 'password' not in json:
            return {'error':'Username and password are requried.'}, 400

        username = json.get('username')
        if User.query.filter_by(username=username).first():
            return {'error': 'Username already exists'}, 400

        try:
            user = User(
                username=username
            )
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            print(f"Session after signup: {session}")
            return user.to_dict(rules=('-password_hash',)), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

class Login(Resource):

    def post(self):
        try:
            json = request.get_json()
            if not json:
                return {'error': 'Invalid input'}, 400

            username = json.get('username')
            user = User.query.filter_by(username=username).first()

            if user and user.authenticate(json.get('password')):
                session['user_id'] = user.id
                spirits = user.spirits

                unique_spirits = {}

                for cocktail in user.cocktails:
                    spirit = cocktail.spirit
                    if not unique_spirits.get(spirit.id):
                        unique_spirits[spirit.id] = {
                            'id': spirit.id,
                            'name': spirit.name,
                            'cocktails': []
                        }

                    unique_spirits[spirit.id]['cocktails'].append({
                        'id': cocktail.id,
                        'name': cocktail.name,
                        'ingredients': cocktail.ingredients,
                        'instructions': cocktail.instructions
                    })

                user_dict = user.to_dict()
                user_dict['spirits'] = list(unique_spirits.values())

                return user_dict, 200

        
            return {'error': 'Incorrect username or password'}, 401
        
        except Exception as e:
            # Log error details for debugging
            print(f"Login error: {e}")
            return {'error': 'An error occurred during login'}, 500

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return {'user': 'Not logged in'}, 401
        
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return {'error': 'User not found'}, 404  
        
        unique_spirits = {}

        for cocktail in user.cocktails:
            spirit = cocktail.spirit
            if not unique_spirits.get(spirit.id):
                unique_spirits[spirit.id] = {
                    'id': spirit.id,
                    'name': spirit.name,
                    'cocktails': []
                }

            unique_spirits[spirit.id]['cocktails'].append({
                'id': cocktail.id,
                'name': cocktail.name,
                'ingredients': cocktail.ingredients,
                'instructions': cocktail.instructions
            })
        # for spirit in user.spirits:
        #     cocktails = [c for c in user.cocktails if c.spirit == spirit]
        #     unique_spirits.append({
        #         'id': spirit.id,
        #         'name': spirit.name,
        #         'cocktails': [
        #             {
        #                 'id': c.id,
        #                 'name': c.name,
        #                 'ingredients': c.ingredients,
        #                 'instructions': c.instructions
        #             } for c in cocktails
        #         ]
        #     })

        user_dict = user.to_dict()
        user_dict['spirits'] = list(unique_spirits.values())

        return user_dict, 200

class Logout(Resource):

    def delete(self):
        if session.get('user_id'):
            try:
                session['user_id'] = None
                return {}, 204
            except Exception as e:
                return {'error': e}, 401
        else:
            return {'error': 'No user is  currently logged in'}, 400

class SpiritResource(Resource):

    def get(self):
        if session.get('user_id'):
            try:
                spirit_dicts = [{'id': spirit.id, 'name': spirit.name} for spirit in Spirit.query.all()]
                return spirit_dicts, 200
            except Exception as e:
                return {'errors': ['validation errors', str(e)]}, 400

        else:
            return {'error': 'Unauthorized to access this resource'}, 401

    def post(self):
        if session.get('user_id'):

            try:
                json = request.get_json()
                username = json.get('username')
                if User.query.filter_by(username=username).first():
                    return {'error': 'Spirit already exists'}, 400

                new_spirit = Spirit(name=json['name'])
                db.session.add(new_spirit)
                db.session.commit()

                return new_spirit.to_dict(), 201
            except Exception as e:
                return {'errors': ['validation errors', str(e)]}, 400
        else:
            return {'error': 'Unauthorized to access this resource'}, 401

class CocktailResource(Resource):

    def post(self):
        user_id = session.get("user_id")
        if user_id:
            try:
                json = request.get_json()
                new_cocktail = Cocktail(
                    name=json['name'],
                    ingredients=json['ingredients'],
                    instructions=json['instructions'],
                    user_id=user_id,
                    spirit_id=json['spirit_id']
                )
                db.session.add(new_cocktail)
                db.session.commit()
                new_cocktail_dict = {
                            'id': new_cocktail.id,
                            'name': new_cocktail.name,
                            'ingredients': new_cocktail.ingredients,
                            'instructions': new_cocktail.instructions,
                        }

                return new_cocktail_dict, 201
            except Exception as e:
                return {'errors':['validation errors', str(e)]}, 400
        else:
            return {'error': 'Unauthorized to access this resource'}, 401

class CocktailById(Resource):

    def patch(self, id):
        user_id = session.get("user_id")
        if not user_id:
            return {'user': 'Not logged in'}, 401

        cocktail = Cocktail.query.filter_by(id=id).first()

        if not cocktail:
            return {"error": "Cocktail not found"}, 404

        if user_id != cocktail.user.id:
            return {'error': 'Unauthorized to access this resource'}, 401

        try:                
            json = request.get_json()
            for attr, value in json.items():
                setattr(cocktail, attr, value)
            
            db.session.add(cocktail)
            db.session.commit()

            updated_cocktail_dict = {
                'id': cocktail.id,
                'name': cocktail.name,
                'ingredients': cocktail.ingredients,
                'instructions': cocktail.instructions
            }

            return updated_cocktail_dict, 200
        except Exception as e:
            return {"errors":["validation errors", str(e)]}, 400

    def delete(self, id):
        user_id = session.get("user_id")
        if not user_id:
            return {'user': 'Not logged in'}, 401

        cocktail = Cocktail.query.filter_by(id=id).first()

        if not cocktail:
            return {"error": "Cocktail not found"}, 404

        if user_id != cocktail.user.id:
            return {'error': 'Unauthorized to access this resource'}, 401

        try:                
            db.session.delete(cocktail)
            db.session.commit()

            return "", 204
        except Exception as e:
            return {"error": str(e)}, 400

# many_cocktails/3
@app.route('/many_cocktails/<int:amount>')
def many_cocktails(amount):
    spirits = Spirit.query.all()
    filtered_spirits = [spirit.to_dict() for spirit in spirits if len(spirit.cocktails) >= amount]
    return filtered_spirits, 200

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(SpiritResource, '/spirits', endpoint='spirits')
api.add_resource(CocktailResource, '/cocktails', endpoint='cocktails')
api.add_resource(CocktailById, '/cocktails/<int:id>', endpoint='cocktail_by_id')

if __name__ == '__main__':
    app.run(port=5555, debug=True)