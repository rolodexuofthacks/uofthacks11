import base64
from flask import Flask, jsonify, request
import cv2 
import json
import firebase_admin;
import cohere
from firebase_admin import db
from flask_cors import CORS
from firebase_admin import credentials,firestore
import face_recognition
import numpy as np

app = Flask(__name__)
CORS(app,origins="http://localhost:3000")


#cohere api key
co = cohere.Client('g2R85UU11pV9sRiFmR8RPJjecUWkQMDiUvfu4RK6')

#connect to database
cred = credentials.Certificate("./uofthackathon-firebase-adminsdk-3sfak-8760298d57.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://uofthackathon-default-rtdb.firebaseio.com/' 
})

db = firestore.client()
doc_ref = db.collection('Test')
# ref = db.reference("/Aditya/test")

##################
@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify("Hello World!")

##get user recording
@app.route('/api/<user>/voice_recording', methods=['POST'])
def post_summary():
    return jsonify("")

@app.route("/api/<user>/friends",  methods=['GET'])
def get_freinds(user):
   # print(doc_ref.document("user_test").stream())
    friends = doc_ref.document("user_test").collection('friends').stream()
    result=[]
    for friend in friends:
        result.append((f'ID: {friend.id}, Data: {friend.to_dict()}'))

    # reference =     (f'/{user}/Friends')
    # print(reference)
    # user_freinds = reference.get()
  
    return jsonify(result)
    



@app.route('/api/<user>/image', methods=['POST'])
def get_image(user):
    data = request.json
    # print(data)
    image_data = data['image'].split(';base64,')[1]  # Remove the base64 prefix
    image = base64.b64decode(image_data) #convert to image
    result = check_image(image)
    if(result == "none"):
        create_new_person()
 
    with open('captured_image.jpeg', 'wb') as f:
        f.write(image)
    return jsonify({'message': 'Image uploaded successfully'})


def check_image(img):
    #get model from firebase and compare to all of them
    return False



def Assign_a_person():
    return

# #create and store the new model for the person
def create_new_person(image):
    new_image = face_recognition.load_image_file(image)
    new_face_locations = face_recognition.face_locations(new_image)
    new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)
    face_encoding = new_face_encodings[0]
    # print( type(face_encoding))
    list_array = face_encoding.tolist()
    jsonface_encoding = json.dumps({"encoding":list_array})
    # print(jsonface_encoding)
    # text  = {"name": "Aditya", "encoding": face_encoding}
    # print(face_encoding)
    # data  = json.dumps(text)
#     ref.push().set({
# 	"Aditya":
# 	{
# 		"Friends":{
#            "Jun":{
#                "Events":{
#                    "Hackathon":{
#                        "Summary":"summary"
#                    }
#                }
#            }
#         } 
# 	}
# })

# create_new_person()


#testing out cohere ai the inform

# text=(
#   "Ice cream is a sweetened frozen food typically eaten as a snack or dessert. "
#   "It may be made from milk or cream and is flavoured with a sweetener, "
#   "either sugar or an alternative, and a spice, such as cocoa or vanilla, "
#   "or with fruit such as strawberries or peaches. "
#   "It can also be made by whisking a flavored cream base and liquid nitrogen together. "
#   "Food coloring is sometimes added, in addition to stabilizers. "
#   "The mixture is cooled below the freezing point of water and stirred to incorporate air spaces "
#   "and to prevent detectable ice crystals from forming. The result is a smooth, "
#   "semi-solid foam that is solid at very low temperatures (below 2 °C or 35 °F). "
#   "It becomes more malleable as its temperature increases.\n\n"
#   "The meaning of the name \"ice cream\" varies from one country to another. "
#   "In some countries, such as the United States, \"ice cream\" applies only to a specific variety, "
#   "and most governments regulate the commercial use of the various terms according to the "
#   "relative quantities of the main ingredients, notably the amount of cream. "
#   "Products that do not meet the criteria to be called ice cream are sometimes labelled "
#   "\"frozen dairy dessert\" instead. In other countries, such as Italy and Argentina, "
#   "one word is used fo\r all variants. Analogues made from dairy alternatives, "
#   "such as goat's or sheep's milk, or milk substitutes "
#   "(e.g., soy, cashew, coconut, almond milk or tofu), are available for those who are "
#   "lactose intolerant, allergic to dairy protein or vegan."
# )

# response = co.summarize(
#   text=text,
# )
# print(response)

# with open("book.json", "r") as f:
# 	file_contents = json.load(f)
# ref.set(file_contents)

print()
if __name__ == '__main__':
    app.run(debug=True)

    
   