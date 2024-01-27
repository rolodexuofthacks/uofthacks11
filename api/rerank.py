import cohere
import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app,origins="sample.json")


@app.route("/api/<user>/<friend_id>/searchEvents",  methods=['GET', 'POST'])
def run_rerank():

    co = cohere.Client(str(os.getenv('COHERE_API_KEY')))


    request_data = request.get_json()

    # Extract necessary information from the request_data
    query = request_data.get('query', '')  # Use an empty string as a default value
    documents = request_data.get('events', [])

    docs = []

    for d in documents:
        docs.append(json.dumps(d))

    textDict = {}

    response = co.rerank(
    model = 'rerank-english-v2.0',
    query = query,
    documents = docs,
    top_n = len(docs)
    )

    textDict = response.results
    #print(textDict)
    ranking_list = []

    for res in textDict:
        newDict = res.document
        for value in newDict.values():
            ranking_list.append(value)
            print(value)
    
    return jsonify(ranking_list)

    #for key, value in textDict.items():
    #print(value)
            

if __name__ == "__main__":
    app.run(debug=True)
        