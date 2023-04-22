import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();

      console.log(data);
      setTables(data);
    };

    fetchTables();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="min-w-[48ch] max-w-[48ch] m-auto p-4 border border-gray-400 rounded-lg">
        <h1 className="text-[2rem] font-bold">Tables</h1>
        {tables.map((tableId: string) => (
          <div key={tableId}>
            <Link
              to={`/tables/${tableId}`}
              className="font-medium text-blue-500 hover:text-blue-600 focus:text-blue-700 duration-500"
            >
              {tableId}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
