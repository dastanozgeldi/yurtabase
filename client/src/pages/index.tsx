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
    <div>
      <h1 className="text-[2rem] font-bold">Tables</h1>
      {tables.map((table: string) => (
        <div key={table}>
          <Link to={`/tables/${table}`}>{table}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
