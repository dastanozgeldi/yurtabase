import { useState } from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";

export const NewTable = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("[]");

  return (
    <div className="h-screen flex">
      <form className="min-w-[48ch] max-w-[48ch] m-auto p-4 border border-gray-400 rounded-lg space-y-3">
        <h1 className="text-[2rem] font-bold">New Table</h1>
        <div>
          <label htmlFor="name">Table Name</label>
          <input
            id="name"
            type="text"
            placeholder="customers"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="code">Starting Data</label>
          <textarea
            id="code"
            placeholder='[{ "name": "John Doe", "age": 25 }]'
            value={code}
            onChange={(e) => setCode(e.currentTarget.value)}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <button
          className={styles.link}
          onClick={async (e) => {
            e.preventDefault();
            const res = await fetch("http://localhost:5000/new-table", {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, code }),
            });

            if (res.status === 200) {
              navigate("/");
            } else {
              const data = await res.json();
              alert(data.message);
            }
          }}
        >
          + Save
        </button>
      </form>
    </div>
  );
};
