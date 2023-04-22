from database import Database

DATABASE_DIR = "data"
CUSTOMERS_TABLE = "test_customers.json"

# Define the schema for your customers table
CUSTOMERS_SCHEMA = {
    "id": int,
    "name": str,
    "address": str,
    "phone_number": str,
    "email": str,
    "gpa": float,
    "girlfriend": bool,
}

# Init database for creation
db = Database(DATABASE_DIR, CUSTOMERS_TABLE, CUSTOMERS_SCHEMA)

# Create a new customer
new_customer = {
    "name": "Bek Slambek",
    "address": "Akbulak District",
    "phone_number": "8-705-387-7382",
    "email": "sbek228@gmail.com",
    "gpa": 3.8,
    "girlfriend": None,
}
db.create(new_customer)

# Read first customer
customer = db.get_by_id(1)
print(customer)

# Update first customer
updated_customer = {
    "name": "Kabylet Adilet",
    "address": "456 Elm St",
    "phone_number": "555-555-1212",
    "email": "jane@example.com",
    "girlfriend": True,
    "gpa": 3.9,
}
db.update(1, updated_customer)

# Delete first customer
# TODO: fix delete customer
# db.delete(1)
