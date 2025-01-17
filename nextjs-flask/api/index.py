from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from os import getenv


app = Flask(__name__)
CORS(app)


@app.route('/api/python/response', methods=['POST'])
def post_data():

    MONGO_URI = getenv("MONGO_URI")
    if not MONGO_URI:
        return jsonify({"message": "Cannot access MONGO_URI."})

    data = None

    try:
        data = request.json
    except Exception as e:
        return jsonify({"message error with json": e})

    collection = None

    try:
        client = MongoClient(MONGO_URI)
        db = client["mydatabase"]
        collection = db["mycollection"]
    except Exception as e:
        return jsonify({"message": e})

    try:

        a = str(collection.insert_one(data))
        return jsonify({"message": str(a)})
    except Exception as e:
        return jsonify({"message": e})

    return jsonify({"message": MONGO_URI[0]})

if __name__ == '__main__':
    app.run(port=5328, debug=True)
