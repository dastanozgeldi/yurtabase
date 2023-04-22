from pathlib import Path
from flask import Flask, jsonify
from flask_cors import CORS
from server.database import Database

app = Flask(__name__)
CORS(app)

path = Path(__file__).parent / "data"


# TODO: make table schemas dynamic
CUSTOMERS_SCHEMA = {
    "id": int,
    "name": str,
    "address": str,
    "phone_number": str,
    "email": str,
    "gpa": float,
    "girlfriend": bool,
}


@app.get("/")
def index():
    """Lists all databases"""
    return [x.name.split(".")[0] for x in path.glob("*.json")]


@app.get("/get/<table>")
def get_table(table):
    db = Database("data", f"{table}.json", CUSTOMERS_SCHEMA)
    customers = db.get_all()
    return jsonify(customers)
