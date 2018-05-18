import pymongo
from pymongo import MongoClient
import json

try:
    MONGODB_URI = "mongodb://mysquaremeal:mysquaremeal@ds157653.mlab.com:57653/mysquaremeal_user_profile_database"
    mlab_client = MongoClient(MONGODB_URI, connectTimeoutMS=30000)
    db = mlab_client.mysquaremeal_user_profile_database
except ConnectionError:
    raise

class registration:


    def check_existing_user(email):
        print('checking user existance')
        if db.user_profile_collection.find({'email':email}).count() > 0:
            print('user profile exists')
            return True
        else:
            print('user profile does not exists')
            return False




    def create_user_profile(user_data):
        print(user_data)
        try:
            email = user_data["email"]
            password = user_data["password"]
            allergies = user_data["allergies"]
            allergies = allergies.replace(" ","")
            allergies_list = allergies.split(",")
            print('--------------------------------------------------------------\n'+email)
            user_exists = registration.check_existing_user(email)
            if user_exists:
                return 'failure - user exists'
            else:
                user_details = {
                    "food_to_avoid": allergies_list,
                    "password": password,
                    "email": email
                }
                db.user_profile_collection.insert(user_details)
                print('new user created with email address : '+email)
                print('new user created with password : '+password)
                print('new user created with allergies : '+allergies)
                return 'success'
        except:
            print('user profile not created')
            return 'failure'
            raise


    def add_user_allergies(user_data):
        email = user_data["email"]
        allergies = user_data["allergies"]
        allergies = allergies.replace(" ","")
        print("Updating Profile for: "+str(email))
        allergy_list = allergies.split(',')
        try:
            for each in allergy_list:
                db['user_profile_collection'].update({'email':email},
                                                     {'$push':{'food_to_avoid':each}})
            return 'success'
        except:
            return 'failure'
            raise

        return 'failure'


    def remove_user_allergies(user_data):
        email = user_data["email"]
        allergies = user_data["allergies"]
        allergies = allergies.replace(" ","")
        print("Updating Profile for: "+str(email))
        allergy_list = allergies.split(',')
        try:
            for each in allergy_list:
                db['user_profile_collection'].update({'email':email},
                                                     {'$pull':{'food_to_avoid':each}})
            return 'success'
        except:
            return 'failure'
            raise

        return 'failure'



    def get_user_allergies(user_data):
        email = user_data["email"]
        print("getting user profile data for: "+str(email))
        profile_data = db['user_profile_collection'].find({'email':email})
        print(profile_data)
        for doc in profile_data:
            food_to_avoid = doc["food_to_avoid"]

        return json.dumps({"allergies":food_to_avoid})



