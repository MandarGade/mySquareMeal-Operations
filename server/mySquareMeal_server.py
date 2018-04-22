from flask import Flask, request
import json

from profile_operations.user_registration import registration
from authentication_operations.user_authentication import authentication



app=Flask(__name__)

@app.route("/")
def index():
    return "index page ....!!!"


@app.route("/registration", methods=['POST'])
def user_registration():
    request_data=request.get_json()
    registration_response=registration.create_user_profile(request_data)
    return registration_response


@app.route("/login",methods=['POST','GET'])
def user_authentication():
    user_email=request.form["email"]
    user_password=request.form["password"]
    authentication_result = authentication.credential_authentication(user_email,user_password)
    return authentication_result


if __name__=='__main__':
    app.run(debug=True)