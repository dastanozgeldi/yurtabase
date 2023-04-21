import os
import json


class Database:
    def __init__(self, database_dir, table, schema):
        self.database_dir = database_dir
        self.table = table
        self.schema = schema

    def get_table_path(self, table):
        """Get the path to a table"""
        return os.path.join(self.database_dir, table)

    def get_next_id(self, table):
        """Get the next id for a table"""
        with open(self.get_table_path(table), "r") as f:
            data = json.load(f)
            if len(data) == 0:
                return 1
            else:
                return max([item["id"] for item in data]) + 1

    def create_customer(self, data):
        """Create a new customer in the customers table"""
        customer_id = self.get_next_id(self.table)
        data["id"] = customer_id
        with open(self.get_table_path(self.table), "r+") as f:
            customers = json.load(f)
            customers.append(data)
            f.seek(0)
            json.dump(customers, f, indent=2)

    def read_customer(self, customer_id):
        """Read a customer from the customers table"""
        with open(self.get_table_path(self.table), "r") as f:
            customers = json.load(f)
            for customer in customers:
                if customer["id"] == customer_id:
                    return customer
            return None

    def update_customer(self, customer_id, data):
        """Update a customer in the customers table"""
        # Check if keys of upcoming data match the schema
        if not set(data.keys()).issubset(set(self.schema.keys())):
            raise ValueError("Data does not match schema keys")

        with open(self.get_table_path(self.table), "r+") as f:
            customers = json.load(f)
            for i, customer in enumerate(customers):
                if customer["id"] == customer_id:
                    data["id"] = customer_id
                    customers[i] = data
                    f.seek(0)
                    json.dump(customers, f, indent=2)
                    return True
            raise False

    def delete_customer(self, customer_id):
        """Delete a customer from the customers table"""
        with open(self.get_table_path(self.table), "r+") as f:
            customers = json.load(f)
            for i, customer in enumerate(customers):
                if customer["id"] == customer_id:
                    del customers[i]
                    f.seek(0)
                    json.dump(customers, f, indent=2)
                    return True
            return False
