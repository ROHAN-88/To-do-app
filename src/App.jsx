import { useState } from "react";
import "./App.css";
import Todoform from "./component/Todoform";
import TodoList from "./component/TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: "5rem" }}>
      <Todoform />
      <TodoList />
    </div>
  );
}

export default App;
