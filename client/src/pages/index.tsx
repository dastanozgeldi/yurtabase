import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import yurt from "../assets/yurt.png";

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
        <div className="flex items-center justify-between">
          <h1 className="text-[2rem] font-bold">Tables</h1>
          <Link to="/new" className={styles.link}>
            + New
          </Link>
        </div>
        {tables.map((tableId: string) => (
          <div key={tableId}>
            <Link to={`/tables/${tableId}`} className={styles.link}>
              {tableId}
            </Link>
          </div>
        ))}
        <div className="flex items-center justify-end space-x-2">
          <img src={yurt} className="w-8 h-8" />
          <h1 className="font-bold text-xl">Yurtabase</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
