import { useEffect, useState } from "react";
import Title from "./Title";
import InputArea from "./components/InputArea";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Reactを学ぶ", isCompleted: true },
    { id: 2, text: "買い物に行く", isCompleted: false },
    { id: 3, text: "歯医者に行く", isCompleted: true },
  ]);

  return (
    <>
      <Title text="ToDo List" />
      <InputArea />
      <TodoList todos={todos} />
      <TodoSummary />
    </>
  );
}

export default App;
