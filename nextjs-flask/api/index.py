from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from os import getenv


MONGO_URI = getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["mydatabase"]
collection = db["mycollection"]


app = Flask(__name__)
CORS(app)


@app.route('/api/python/response', methods=['POST'])
def post_data():
    data = request.json

    if not data:
        return jsonify({"message": "Error."})

    collection.insert_one(data)

    return jsonify({"message": "Data received!", "data": data})


if __name__ == '__main__':
    app.run(port=5328, debug=True)
