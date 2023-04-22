from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS
from server.database import Database

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).parent / "data"


@app.get("/")
def index():
    """Lists all databases"""
    return [x.name.split(".")[0] for x in BASE_DIR.glob("*.json")]


@app.get("/get/<table>")
def get_table(table):
    db = Database(
        "data",
        f"{table}.json",
    )
    customers = db.get_all()
    return jsonify(customers)


@app.post("/new-table")
def new_table():
    data = request.json
    with open(f'{BASE_DIR / data["name"]}.json', "w") as f:
        f.write(data["code"])

    return {"message": "success"}


@app.delete("/delete-table/<table>")
def delete_table(table):
    path = BASE_DIR / f"{table}.json"
    path.unlink()
    return {"message": "success"}
