import speech_recognition as speechrec
import cohere
import os
from dotenv import load_dotenv
load_dotenv()



# global variables 
keywords = ['hello james', 'james']
rec = speechrec.Recognizer()
mic = speechrec.Microphone()



def isRecording():

    if not isinstance(rec, speechrec.Recognizer):
        print('TypeError: recognizer mist be of instance speechrec.Recognizer()')
    
    if not isinstance(mic, speechrec.Microphone):
        print('TypeError: audioInput must be of instance speechrec.Microphone()')

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

        co = cohere.Client(str(os.getenv('API_KEY'))) # This is your trial API key
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

    

def mainFunc():
    endRec = True
    currStr = ''
    while endRec:
        audio = isRecording()
        text = speechToText(audio)
        currStr += text + ' '
        endRec = startEndConversion(text)
    print(currStr)



if __name__ == "__main__":
    mainFunc()



