from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app,origins="http://localhost:3000")



@app.route('/api/hello', methods=['GET'])
def hello_world():
   
    return jsonify("Hello World!")


if __name__ == '__main__':
    app.run(debug=True)

    
   