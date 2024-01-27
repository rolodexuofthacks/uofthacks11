import cv2
import face_recognition
import pickle

# Load your image
image_to_learn = face_recognition.load_image_file("./images/image1.jpeg")

# Detect faces in the image
face_locations = face_recognition.face_locations(image_to_learn)
face_encodings = face_recognition.face_encodings(image_to_learn, face_locations)

# Assuming the first face is the person you want to save
if face_encodings:
    face_encoding = face_encodings[0]
    face_data = {"name": "Aditya", "encoding": face_encoding}

    # Save face data
    with open("face_data.pkl", "wb") as f:
        pickle.dump(face_data, f)


with open("face_data.pkl", "rb") as f:
    saved_face_data = pickle.load(f)

# Load a new image
new_image = face_recognition.load_image_file("./images/image2.jpeg")
new_face_locations = face_recognition.face_locations(new_image)
new_face_encodings = face_recognition.face_encodings(new_image, new_face_locations)

for new_face_encoding in new_face_encodings:
    # Compare the face encodings
    matches = face_recognition.compare_faces([saved_face_data["encoding"]], new_face_encoding)

    if True in matches:
        first_match_index = matches.index(True)
        name = saved_face_data["name"]
        print(f"Match Found: {name}")
    else:
        print("No Match Found")