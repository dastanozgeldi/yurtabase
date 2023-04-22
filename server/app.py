import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get("/get-all")
def index():
    with open("../customer_data/customers.json", "r") as f:
        # wrap as json object then return
        customers = json.load(f)
    return jsonify(customers)
