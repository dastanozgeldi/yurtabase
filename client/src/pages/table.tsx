import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Customer = {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  girlfriend: boolean;
  gpa: number;
};

function Table() {
  const { table } = useParams();
  const [customers, setCustomers] = useState<Customer[]>([]);

  console.log(table);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch(`http://localhost:5000/get/${table}`);
      const data = await res.json();

      console.log(data);
      setCustomers(data);
    };

    fetchCustomers();
  }, [table]);

  return (
    <>
      <div className="max-w-max my-4 mx-auto p-4">
        <h1 className="text-[2rem] font-bold my-2">Customers</h1>
        <table className="min-w-full divide-y divide-gray-200 border-gray-200 border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                ID
              </th>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                Address
              </th>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                Phone No.
              </th>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                Girlfriend
              </th>
              <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                GPA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {customer.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.address}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.phone_number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.girlfriend ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {customer.gpa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
