from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    cocktails = db.relationship('Cocktail', back_populates='user', cascade='all, delete-orphan')
    spirits = association_proxy('cocktails', 'spirit')

    serialize_rules = ('-_password_hash', '-cocktails')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Cocktail(db.Model, SerializerMixin):
    __tablename__ = 'cocktails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ingredients = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    spirit_id = db.Column(db.Integer, db.ForeignKey('spirits.id'), nullable=False)

    user = db.relationship('User', back_populates='cocktails')
    spirit = db.relationship('Spirit', back_populates='cocktails')

    serialize_rules = ('-user.id', '-spirit.id', '-spirit')

    @validates('name')
    def validate_customer(self, key, name):
        if not name:
            raise ValueError("Cocktail name must be provided.")
        return name

    @validates('ingredients')
    def validate_customer(self, key, ingredients):
        if not ingredients:
            raise ValueError("Ingredients must be provided.")
        return ingredients

    @validates('instructions')
    def validate_customer(self, key, instructions):
        if not instructions:
            raise ValueError("Instructions must be provided.")
        return instructions

    @validates('user_id')
    def validate_user(self, key, user_id):
        if not db.session.get(User, user_id):
            raise ValueError("User not found.")
        return user_id

    @validates('spirit_id')
    def validate_spirit(self, key, spirit_id):
        if not db.session.get(Spirit, spirit_id):
            raise ValueError("Spirit not found.")
        return spirit_id


class Spirit(db.Model, SerializerMixin):
    __tablename__ = 'spirits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

    cocktails = db.relationship('Cocktail', back_populates='spirit', cascade='all, delete-orphan')
    users = association_proxy('cocktails', 'user')

    serialize_rules = ('-cocktails.spirit',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Spirit name must be provided")
        return name.lower().strip()