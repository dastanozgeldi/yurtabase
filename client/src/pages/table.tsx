import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Table() {
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
      <h1 className="text-[2rem] font-bold my-2">{tableId}</h1>
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
