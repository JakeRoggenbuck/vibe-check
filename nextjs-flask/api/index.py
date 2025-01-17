from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from os import getenv


app = Flask(__name__)
CORS(app)


@app.route('/api/python/response', methods=['POST'])
def post_data():
    # try:
    #     data = request.json
    #
    #     MONGO_URI = getenv("MONGO_URI")
    #     client = MongoClient(MONGO_URI)
    #     db = client["mydatabase"]
    #     collection = db["mycollection"]
    #
    #     if not data:
    #         return jsonify({"message": "Error."})
    #
    #     collection.insert_one(data)
    #     return jsonify({"message": "Data received!"})
    #
    # except Exception:
    #     return jsonify({"message": "Nothing worked..."})
    return jsonify({"message": "Nothing worked..."})

if __name__ == '__main__':
    app.run(port=5328, debug=True)
