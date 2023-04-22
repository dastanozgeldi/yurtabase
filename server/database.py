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

    def create(self, data):
        """Create a new item in the table"""
        item_id = self.get_next_id(self.table)
        data["id"] = item_id
        with open(self.get_table_path(self.table), "r+") as f:
            items = json.load(f)
            items.append(data)
            f.seek(0)
            json.dump(items, f, indent=2)

    def get_all(self):
        """Get all items from the table"""
        with open(self.get_table_path(self.table), "r") as f:
            items = json.load(f)
            return items

    def get_by_id(self, item_id):
        """Get an item by ID from the table"""
        with open(self.get_table_path(self.table), "r") as f:
            items = json.load(f)
            for item in items:
                if item["id"] == item_id:
                    return item
            return None

    def update(self, item_id, data):
        """Update an item in the table"""
        # Check if keys of upcoming data match the schema
        if not set(data.keys()).issubset(set(self.schema.keys())):
            raise ValueError("Data does not match schema keys")

        with open(self.get_table_path(self.table), "r+") as f:
            items = json.load(f)
            for i, item in enumerate(items):
                if item["id"] == item_id:
                    data["id"] = item_id
                    items[i] = data
                    f.seek(0)
                    json.dump(items, f, indent=2)
                    return True
            raise False

    def delete(self, item_id):
        """Delete an item from the table"""
        with open(self.get_table_path(self.table), "r+") as f:
            items = json.load(f)
            for i, item in enumerate(items):
                if item["id"] == item_id:
                    del items[i]
                    f.seek(0)
                    json.dump(items, f, indent=2)
                    return True
            return False
