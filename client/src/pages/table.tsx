import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styles } from "../styles";

function Table() {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const [table, setTable] = useState<any[]>([]);

  const fields = Object.keys(table[0] || {});
  console.log(fields);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`http://localhost:5000/get/${tableId}`);
      const data = await res.json();

      console.log(data);
      setTable(data);
    };

    fetchCustomers();
  }, [tableId]);

  return (
    <div className="max-w-max my-4 mx-auto p-4">
      <div className="flex items-center justify-between space-x-6">
        <h1 className="text-[2rem] font-bold my-2">{tableId}</h1>
        <div className="space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="font-medium text-blue-500 hover:text-blue-600 focus:text-blue-700 duration-500"
          >
            &larr; Go Back
          </button>
          <button
            className={styles.delete}
            onClick={async () => {
              const res = await fetch(
                `http://localhost:5000/delete-table/${tableId}`,
                {
                  method: "DELETE",
                  mode: "cors",
                  cache: "no-cache",
                  credentials: "same-origin",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (res.status === 200) {
                navigate("/");
              } else {
                alert("Something went wrong");
              }
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border-gray-200 border rounded-lg flex">
        {fields.map((field) => (
          <div>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  {field}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.map((item) => (
                <tr key={item.id}>
                  {typeof item[field] === "boolean" ? (
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {item[field] ? "Yes" : "No"}
                    </td>
                  ) : (
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {item[field]}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </div>
        ))}
      </table>
    </div>
  );
}

export default Table;
