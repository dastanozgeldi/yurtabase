from pathlib import Path
from flask import Flask, jsonify
from flask_cors import CORS
from server.database import Database

app = Flask(__name__)
CORS(app)

path = Path(__file__).parent / "data"


@app.get("/")
def index():
    """Lists all databases"""
    return [x.name.split(".")[0] for x in path.glob("*.json")]


@app.get("/get/<table>")
def get_table(table):
    db = Database(
        "data",
        f"{table}.json",
    )
    customers = db.get_all()
    return jsonify(customers)
