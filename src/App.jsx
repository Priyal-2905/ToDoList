import { useState, useEffect } from "react";
import "./App.css";
import List from "./components/list";
import axios from "axios";

const URL = "https://todolist-server-4t5c.onrender.com";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/item`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  async function add() {
    if (!input) return;
    const body = { task: input };

    // Send the POST request to add the task
    const response = await axios.post(`${URL}/api/add`, body);

    fetch(`${URL}/api/item`)
      .then((res) => res.json())
      .then((data) => setItems(data));
    // Clear the input field
    setInput("");
  }

  //deleting  
  async function handleDel(id) {
    await axios.delete(`${URL}/api/delete/${id}`);

    fetch(`${URL}/api/item`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  //Creating a template before mapping
  function createList(item) {
    return (
      <List
        key={item._id}
        clicky={() => handleDel(item._id)}
        text={item.task}
      />
    );
  }

  return (
    <div className="App">
      <div className="wrap">
        <h1 className="DoIt">Just Do It</h1>
        <div className="Search">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                add();
              }
            }}
            type="text"
            className="InputField"
            value={input}
            onChange={handleInput}
          />
          <button className="Add" onClick={add}>
            Add
          </button>
        </div>
        <div className="ListBox">
          <div className="ListContent">{items.map(createList)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
