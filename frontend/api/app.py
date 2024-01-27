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

global FRIEND

FRIEND = ""

#cohere api key

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


#get list of friends
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
    

#get list of events
@app.route("/api/<user>/<friend_id>/events", methods=['GET'])
def get_events(user, friend_id):
    events = doc_ref.document("user_test/friends/"+friend_id).collection("events").stream()
    result = []
    for event in events:
        result.append((f'ID: {event.id}, Data: {event.to_dict()}'))
    return jsonify(result)





@app.route('/api/<user>/image', methods=['POST'])
def get_image(user):
    data = request.json
    # print(data)
    image_data = data['image'].split(';base64,')[1]  # Remove the base64 prefix
    image = base64.b64decode(image_data) #convert to image
    with open('captured_image.jpeg', 'wb') as f:
            f.write(image)
    result = check_image(image)
    
    if (not result):
        create_new_person()
    else:
        #TO DO
        print("set name")
    print(result)
    return jsonify({'message': 'Image uploaded successfully'})

   
    # if(result == "none"):
    #     return
 
   

def check_image(img):
    doc = doc_ref.document("user_test/friends/WwH0wPiYUPKaLSJPhOKU").get()
    if doc.exists:
        encoding=  doc.to_dict().get("encoding", None)  # Returns None if the field does not exist
    else:
        return 'Document not found'
    new_array = np.array(encoding)
    print(new_array)
    new_image = face_recognition.load_image_file("./captured_image.jpeg")
    new_face_locations = face_recognition.face_locations(new_image)
    new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)
 
    for new_face_encoding in new_face_encodings:
        print(type(new_face_encoding))
    # Compare the face encodings
        matches = face_recognition.compare_faces([new_array], new_face_encoding)

    if True in matches:
        return True
    else:
        print("No Match Found")
    # get model from firebase and compare to all of them
    return False



def Assign_a_person():
    return

# #create and store the new model for the person
def create_new_person():
    new_image = face_recognition.load_image_file("./captured_image.jpeg")
    new_face_locations = face_recognition.face_locations(new_image)
    new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)
    face_encoding = new_face_encodings[0]
    # print( type(face_encoding))
    print(face_encoding)
    list_array = face_encoding.tolist()
    print(list_array)
    # doc_ref.document("user_test/friends/WwH0wPiYUPKaLSJPhOKU").update({"encoding": list_array})
    # jsonface_encoding = json.dumps({"encoding":list_array}
                                   
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



# with open("book.json", "r") as f:
# 	file_contents = json.load(f)
# ref.set(file_contents)

print()
if __name__ == '__main__':
    app.run(debug=True)

    
   