import speech_recognition as speechrec
import cohere
import os
from flask import Flask, request
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

# global variables 
keywords = ['hello james', 'james']
getAudio = request.files['insert frontend mic name']
rec = speechrec.Recognizer()
mic = speechrec.AudioFile(getAudio)
client = OpenAI(api_key=str(os.getenv('GPT_API_KEY')))



# functions
@app.route('/recording', methods=['GET'])
def isRecording():

    if not isinstance(rec, speechrec.Recognizer):
        print('TypeError: rec mist be of instance speechrec.Recognizer()')
    
    if not isinstance(mic, speechrec.AudioFile):
        print('TypeError: mic must be of instance speechrec.AudioFile()')

    with mic as source:
        rec.adjust_for_ambient_noise(source)
        audio_data = rec.listen(source)
        #print("Recognizing...") # checking output
    return audio_data



def speechToText(audioInput):

    transcriptObj = {
        'text': 'None',
        'requestErr': False,
        'unknownErr': False
    }

    try:
        transcriptObj['text'] = rec.recognize_google(audioInput)
        #print(transcriptObj['text']) # checking output
    except speechrec.RequestError:
        transcriptObj['requestErr'] = True
    except speechrec.UnknownValueError:
        transcriptObj['unknownErr'] = True
    
    return transcriptObj['text']
    


def startEndConversion(text):
   
    if keywords[0] in text.lower():
        print('recording...')
    elif keywords[1] in text.lower():
        print('finished recording...')
        return False
    else:
        #print('') # checking output
        pass
    return True



def summarizeText(totalText):
    #cohere summarization model
    textArr = totalText.split()
    
    if len(textArr) > 6:
        modTextArr = textArr[2:-1]

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

    if len(textArr) > 6:
        modTextArr = textArr[2:-1]

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

    if len(textArr) > 6:
        modTextArr = textArr[2:-1]

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

    if len(textArr) > 6:
        modTextArr = textArr[2:-1]

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

    if len(textArr) > 6:
        modTextArr = textArr[2:-1]

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
    


def mainFunc():
    endRec = True
    currStr = ''
    while endRec:
        audio = isRecording()
        text = speechToText(audio)
        currStr += text + ' '
        endRec = startEndConversion(text)
    #print(currStr)
    summarizeText(currStr)
    getFirstName(currStr)
    getDate(currStr)
    getEventName(currStr)
    getEventLocation(currStr)



if __name__ == "__main__":
    mainFunc()








