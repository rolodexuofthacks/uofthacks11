import base64
import random
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
from firebase_admin import storage
from openai import OpenAI

app = Flask(__name__)
cors= CORS(app,origins="http://127.0.0.1:3000", resources={r'/api/*':{'orgins':"*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


FRIEND = ""
EVENT_NAME = ""
FRIEND_NAME = ""
LOCATION = ""
DATE =""
#
SUMMARY=""

date=""
IMG_URL = ""

newPerson=True

#open Ai
client = OpenAI(api_key=str(os.getenv('GPT_API_KEY')))

#cohere api key

#connect to database
cred = credentials.Certificate("./uofthackathon-firebase-adminsdk-3sfak-8760298d57.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://uofthackathon-default-rtdb.firebaseio.com/' , 'storageBucket': 'uofthackathon.appspot.com'
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
@cross_origin()
def post_summary(user):
    data = request.json
    global EVENT_NAME, FRIEND_NAME, SUMMARY, LOCATION, DATE
    print(data["data"])
    EVENT_NAME = getEventName(data["data"])
    FRIEND_NAME = getFirstName(data["data"])
    SUMMARY = summarizeText(data['data'])
    LOCATION =getEventLocation(data["data"])
    DATE = getDate(data["data"])
    print("eventname: "+EVENT_NAME,"friend: "+FRIEND_NAME,"summary: " +SUMMARY, "Location: "+LOCATION, "date: "+DATE) 

    print("summary id" ,FRIEND)
    if(FRIEND == None):
        create_new_person()
    else:
        add_to_firebase("user_test",FRIEND)
    return jsonify({'message': 'Voice recoding submitted succesfully'})


def upload_image(file_path, destination_blob_name):
    bucket = storage.bucket()
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(file_path)

    # Make the blob publicly viewable.
    blob.make_public()

    return blob.public_url

def save_image_url_to_firestore(url, document_id):
    doc_ref = db.collection('images').document(document_id)
    doc_ref.set({
        'url': url
    })


#get list of friends
@app.route("/api/<user>/friends",  methods=['GET'])
@cross_origin()
def get_freinds(user):
   # print(doc_ref.document("user_test").stream())
    friends = doc_ref.document("user_test").collection('friends').stream()
    result = []

    for friend in friends:
        friend_data = friend.to_dict()  # Convert the document to a dictionary
        friend_entry = {
            'ID': friend.id,
            'Data': friend_data
    }
        result.append(friend_entry)

    # reference =     (f'/{user}/Friends')
    # print(reference)
    # user_freinds = reference.get()
  
    return jsonify(result)
    

#get list of events
@app.route("/api/<user>/<friend_id>/events", methods=['GET'])
@cross_origin()
def get_events(user, friend_id):
    events = doc_ref.document("user_test/friends/"+friend_id).collection("events").stream()
    result = []
    for event in events:
        event_data = event.to_dict()
        event_data['ID'] = event.id  # Add the ID to the event data
        result.append(event_data)
    return jsonify(result)



# def test():
#     # text = "Hey there! I wanted to share my experience at an art event on the 8th of October 2022 called "Artistry Expo." It was an art exhibition at the Metropolitan Gallery, starting at 2:00 PM. My name is Olivia, and if you were into artistic expressions, it was worth checking out. The expo brought together artists and art enthusiasts discussing the latest trends in contemporary art and provided excellent opportunities for exploring diverse artistic expressions. I was particularly excited about the interactive workshops and live art installations. I heard about it through art magazines and thought it could be a great chance to immerse myself in the world of creativity and connect with fellow art enthusiasts. I hope you marked it on your calendar, and perhaps I saw you at Artistry Expo in 2022 on the 8th!"
#     EVENT_NAME = getEventName(text)
#     FRIEND_NAME = getFirstName(text)
#     SUMMARY = summarizeText(text)
#     LOCATION =getEventLocation(text)
#     DATE = getDate(text)
#     print("eventname: "+EVENT_NAME,"friend: "+FRIEND_NAME,"summary: " +SUMMARY, "Location: "+LOCATION, "date: "+DATE) 

#     if(FRIEND == None):
#         create_new_person()
#     else:
#         add_to_firebase("user_test",FRIEND)
#     return jsonify({'message': 'Voice recoding submitted succesfully'})

@app.route('/api/<user>/image', methods=['POST', "OPTIONS"])
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
    print(result)
    if(result==None):
        newPerson=True
    else: 
        newPerson=False
        global FRIEND
        FRIEND = result
        print("test" + FRIEND)
    
    # if (not result):
       
    # else:
    #     #TO DO
    #     print("set name")
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
    print("testing id"+friend_id)
    friends_ref = doc_ref.document('user_test').collection('friends').document(friend_id)
    events_collection_ref = friends_ref.collection('events')
    new_event_doc_ref = events_collection_ref.add(data) # Firestore generates a unique ID
    


def check_image(img, user):
    doc = doc_ref.document("user_test").collection("friends").stream()

    for friend in doc:
        test = friend.to_dict()
       
        encoding=  test["encoding"]  # Returns None if the field does not exist
      
        new_array = np.array(encoding)
        print(new_array)
        new_image = face_recognition.load_image_file("./captured_image.jpeg")
        new_face_locations = face_recognition.face_locations(new_image)
        new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)
        matches = []
        for new_face_encoding in new_face_encodings:
            print(type(new_face_encoding))
        # Compare the face encodings
            matches = face_recognition.compare_faces([new_array], new_face_encoding)

        if True in matches:
            return f'{friend.id}'
        else:
            print("No Match Found")
        # get model from firebase and compare to all of them

    return None



def Assign_a_person():
    return


# #create and store the new model for the person
def create_new_person():
    new_image = face_recognition.load_image_file("./captured_image.jpeg")
    new_face_locations = face_recognition.face_locations(new_image)
    new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)
    face_encoding = new_face_encodings[0]
    # print( type(face_encoding))
    # print(face_encoding)
    list_array = face_encoding.tolist()
    # print(list_array)
    file_path = './captured_image.jpeg' 
    
 # Path to your image file
    destination_blob_name = 'images/images'+ str(random.randint(1000000000, 9999999999)) # Path in the storage bucket

# Upload the image
    image_url = upload_image(file_path, destination_blob_name)

# Save the image URL to Firestore
    add_result,new_doc_ref = doc_ref.document("user_test").collection("friends").add({"name":FRIEND_NAME,"encoding": list_array, "img":image_url})
    print(new_doc_ref.id)
    add_to_firebase("user_test",new_doc_ref.id)
                                   
    
# create_new_person()

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

    
   