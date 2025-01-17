from flask import Flask, request, jsonify
from flask_cors import CORS
from os import getenv


app = Flask(__name__)
CORS(app)


@app.route('/api/python/response', methods=['POST'])
def post_data():

    data = request.json

    return jsonify({"message": data})

if __name__ == '__main__':
    app.run(port=5328, debug=True)
