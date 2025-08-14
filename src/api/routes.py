"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    usuario=User.query.filter_by(email=email).first() #se hace la busqueda
    if usuario is None:
        return jsonify({"msg": "No existe el usuario"}), 404
    
    if email != usuario.email or password != usuario.password: #se compara con la base de datos el email y el password
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    response_body={
        "access_token": access_token, 
        "user": usuario.serialize()
    }
    return jsonify(response_body), 200

@api.route("/register", methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    usuario=User.query.filter_by(email=email).first() #se hace la busqueda
    if usuario is None: #si el usuario no existe lo va a crear
        new_user= User( #crear la variable del nuevo usuario con los datos que queremos guardar en la tabla
            email=email,
            password=password,
            is_active=True
        )
        db.session.add(new_user) #agrega
        db.session.commit() #guarda
        return jsonify({"msg": "El usuario ha sido registrado"}), 201

    return jsonify({"msg": "Existe el usuario"}), 302
