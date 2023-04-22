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
    <div className="container mx-auto my-4 p-4">
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
  );
}

export default Home;
