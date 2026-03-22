import React, { useState } from "react";

export default function InputArea() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const func1 = (event) => {
    setInputText(event.target.value);
  };

  const handleSave = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
    };

    console.log(inputText);
    console.log(newTodo.id);
    setTodos([...todos, newTodo]);
    setInputText("");
  };

  return (
    <div>
      <input type="text" onChange={func1} value={inputText} />
      <p>現在のStateの中身： {inputText}</p>
      <button onClick={handleSave}>保存</button>
      <p>タスクの数：{todos.length}</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
