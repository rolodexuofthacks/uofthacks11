import base64
from flask import Flask, jsonify, request
import cv2 
import json
import firebase_admin;
import cohere
from firebase_admin import db
from flask_cors import CORS, cross_origin
from firebase_admin import credentials,firestore
import face_recognition
import numpy as np
import os
from openai import OpenAI

app = Flask(__name__)
CORS(app,origins="http://127.0.0.1:3000")
app.config['CORS_HEADERS'] = 'Content-Type'

global FRIEND, IMG ,EVENT_NAME, FRIEND_NAME, SUMMARY, LOCATION, DATE

FRIEND = ""
EVENT_NAME = ""
FRIEND_NAME = ""
LOCATION = ""
DATE =""
#
SUMMARY=""
date=""
IMG = ""

newPerson=True

#open Ai
client = OpenAI(api_key=str(os.getenv('GPT_API_KEY')))

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
@app.route('/api/<user>/voice_recording', methods=['POST','OPTIONS'])

def post_summary(user):
    data = request.json
    print(data["data"])
    EVENT_NAME = getEventName(data["data"])
    FRIEND_NAME = getFirstName(data["data"])
    SUMMARY = summarizeText(data['data'])
    LOCATION =getEventLocation(data["data"])
    DATE = getDate(data["data"])
    print("eventname: "+EVENT_NAME,"friend: "+FRIEND_NAME,"summary: " +SUMMARY, "Location: "+LOCATION, "date: "+DATE) 
    return jsonify({'message': 'Voice recoding submitted succesfully'})


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





@app.route('/api/<user>/image', methods=['POST', "OPTION"])
@cross_origin()
def get_image(user):

    # data = json.loads(request.data)
    data = request.json
    # print(data)
    image_data = data['image'].split(';base64,')[1]  # Remove the base64 prefix
    image = base64.b64decode(image_data) #convert to image
    with open('captured_image.jpeg', 'wb') as f:
            f.write(image)
    result = check_image(image,"user_test")
    # newPerson==result
    # # if (not result):
       
    # # else:
    # #     #TO DO
    # #     print("set name")
    print(result)
    return jsonify({'message': 'Image uploaded successfully'})

   
    # if(result == "none"):
    #     return
 

def add_to_firebase(user, friend_id):
    
    data = {
        'location': LOCATION,
        'date': DATE,
        "name":EVENT_NAME,
        "summary":SUMMARY
    }
    doc_ref.collection(user+"/friends/"+friend_id).add(data)



def check_image(img, user):
    doc = doc_ref.document("user_test").collection("friends").stream()

    for friend in doc:
      test = friend.to_dict()
      print(test["encoding"])

    # if doc.exists:
    #     encoding=  doc.to_dict().get("encoding", None)  # Returns None if the field does not exist
    # else:
    #     return 'Document not found'
    # new_array = np.array(encoding)
    # print(new_array)
    # new_image = face_recognition.load_image_file("./captured_image.jpeg")
    # new_face_locations = face_recognition.face_locations(new_image)
    # new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)
    # matches = []
    # for new_face_encoding in new_face_encodings:
    #     print(type(new_face_encoding))
    # # Compare the face encodings
    #     matches = face_recognition.compare_faces([new_array], new_face_encoding)

    # if True in matches:
    #     return True
    # else:
    #     print("No Match Found")
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
    # doc_ref.document("user_test/friends/x2RDe2RmNlNzqsNnExuX").update({"encoding": list_array})
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
    
create_new_person()

#voice recoding code
def summarizeText(totalText):
#cohere summarization model
    textArr = totalText.split()

    if len(textArr) > 10:
        modTextArr = textArr[5:-5]

        modText = ' '.join(modTextArr)

        co = cohere.Client(str(os.getenv('COHERE_API_KEY'))) # This is your trial API key
        response = co.summarize( 
            text= modText,
            length='short',
            format='paragraph',
            model='command',
            additional_command='',
            temperature=0.6,
            ) 
        #print('Summary:', response.summary) checking summary
        return response.summary

    else:
        pass



def getFirstName(totalText):
    textArr = totalText.split()

    if len(textArr) > 10:
        modTextArr = textArr[5:-5]

        modText = ' '.join(modTextArr)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": f'''get the first name of the person from this text, 
                    return only the first name with no other text. \n{modText}\n'''
                },
                {
                    "role": "user",
                    "content": ""
                }
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        print(str(response.choices[0].message.content))
        return str(response.choices[0].message.content)
    else:
        pass
    


def getDate(totalText):
    textArr = totalText.split()

    if len(textArr) > 10:
        modTextArr = textArr[5:-5]

        modText = ' '.join(modTextArr)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": f'''get the date of the event from this text, 
                    return only the date with no other text formatted like 12th October 2022. 
                    \n{modText}\n'''
                },
                {
                    "role": "user",
                    "content": ""
                }
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        print(str(response.choices[0].message.content))
        return str(response.choices[0].message.content)
    else:
        pass



def getEventName(totalText):
    textArr = totalText.split()

    if len(textArr) > 10:
        modTextArr = textArr[5:-5]

        modText = ' '.join(modTextArr)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": f'''get the name of the event from this text,
                    return only the name with no other text. \n{modText}\n'''
                },
                {
                    "role": "user",
                    "content": ""
                }
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        print(str(response.choices[0].message.content))
        return str(response.choices[0].message.content)
    else:
        pass



def getEventLocation(totalText):
    textArr = totalText.split()

    if len(textArr) > 10:
        modTextArr = textArr[5:-5]

        modText = ' '.join(modTextArr)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": f'''get the city/town, state/province, country of the event from this text, 
                    return only the city/town, state/province, country with no other text . If no city/town 
                    is specified, return the province/state and country only. \n{modText}\n'''
                },
                {
                    "role": "user",
                    "content": ""
                }
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        print(str(response.choices[0].message.content))
        return str(response.choices[0].message.content)
    else:
        pass
    



# with open("book.json", "r") as f:
# 	file_contents = json.load(f)
# ref.set(file_contents)

print()
if __name__ == '__main__':
    app.run(debug=True)

    
   