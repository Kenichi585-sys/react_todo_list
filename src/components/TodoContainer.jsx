import React, { useState } from "react";

export default function InputArea() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const func1 = (event) => {
    setInputText(event.target.value);
  };

  const handleSave = () => {
    if (inputText.trim() === "") return alert("文字を入力して下さい");

    const newTodo = {
      text: inputText,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  const deleteTodo = (index) => {
    const result = window.confirm("本当に削除してもよろしいですか？");

    if (result) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  const updateTodo = () => {
    if (editText.trim() === "") return alert("文字を入力して下さい");

    const newTodos = todos.map((todo, i) => {
      if (i === editingIndex) {
        return {
          ...todo,
          text: editText,
        };
      }
      return todo;
    });

    setTodos(newTodos);
    setEditingIndex(null);
    setEditText("");
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const completedCount = todos.filter(
    (todo) => todo.isCompleted === true,
  ).length;

  const uncompletedCount = todos.filter(
    (todo) => todo.isCompleted === false,
  ).length;

  return (
    <div>
      <input type="text" onChange={func1} value={inputText} />
      <button onClick={handleSave}>保存</button>
      <p>全てのタスク：{todos.length}</p>
      <p>完了済み：{completedCount}</p>
      <p>未完了：{uncompletedCount}</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(index)}
            />
            {editingIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}

            {editingIndex === index ? (
              <button onClick={updateTodo}>保存</button>
            ) : (
              <button
                onClick={() => {
                  setEditingIndex(index);
                  setEditText(todo.text);
                }}
              >
                編集
              </button>
            )}

            <button onClick={() => deleteTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
