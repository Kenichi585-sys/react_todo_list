import React, { useState } from "react";
import TodoItem from "./TodoItem";

export default function InputArea() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // 入力欄の文字を状態に反映
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // 新規Todoの保存
  const handleSave = () => {
    if (inputText.trim() === "") return alert("文字を入力して下さい");

    const newTodo = {
      text: inputText,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };
  // Todo削除
  const deleteTodo = (index) => {
    const result = window.confirm("本当に削除してもよろしいですか？");

    if (result) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  // Todo更新
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

  // 完了、未完了の切り替え
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

  // 完了の計算
  const completedCount = todos.filter(
    (todo) => todo.isCompleted === true,
  ).length;

  // 未完了の計算
  const uncompletedCount = todos.filter(
    (todo) => todo.isCompleted === false,
  ).length;

  return (
    <div>
      <input type="text" onChange={handleInputChange} value={inputText} />
      <button onClick={handleSave}>保存</button>
      <p>全てのタスク：{todos.length}</p>
      <p>完了済み：{completedCount}</p>
      <p>未完了：{uncompletedCount}</p>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            editText={editText}
            setEditText={setEditText}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}
