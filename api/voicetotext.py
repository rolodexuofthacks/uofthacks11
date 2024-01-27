import speech_recognition as speechrec

# global variables 
keywords = ['hello app name', 'goodbye app name']
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
        transcriptObj['text'] = rec.recognize_google(audioInput, language='en-CA')
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
        modTextArr = textArr[3:-3]

        modText = ' '.join(modTextArr)

        #cohere stuff goes here, send to firebase.
        return modText
    
    else:
        pass

    

def start():
    endRec = True
    currStr = ''
    while endRec:
        audio = isRecording()
        text = speechToText(audio)
        currStr += text + ' '
        endRec = startEndConversion(text)
    print(currStr)


if __name__ == "__main__":
    
    start()


