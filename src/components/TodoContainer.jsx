import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoContainer() {
  const [inputText, setInputText] = useState("");

  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("my_todo");
    return saveTodos ? JSON.parse(saveTodos) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("my_todo", JSON.stringify(todos));
  }, [todos]);

  // 入力欄の文字を状態に反映
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // 新規Todoの保存
  const handleSave = () => {
    const trimmedText = inputText.trim();
    if (trimmedText === "") return alert("文字を入力して下さい");

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  // Todo削除
  const deleteTodo = (id) => {
    const result = window.confirm("本当に削除してもよろしいですか？");
    if (result) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  // Todo更新
  const updateTodo = () => {
    const trimmedText = editText.trim();
    if (trimmedText === "") return alert("文字を入力して下さい");

    const newTodos = todos.map((todo) => {
      if (todo.id === editingId) {
        return {
          ...todo,
          text: trimmedText,
        };
      }
      return todo;
    });

    setTodos(newTodos);
    setEditingId(null);
    setEditText("");
  };

  // 完了、未完了の切り替え
  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
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
  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  // 未完了の計算
  const uncompletedCount = todos.filter(
    (todo) => todo.isCompleted === false,
  ).length;

  return (
    <div className="todo-app">
      <h1>React ToDo List</h1>

      <div className="input-group">
        <input
          type="text"
          onChange={handleInputChange}
          value={inputText}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;

            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />
        <button className="btn-add" onClick={handleSave}>
          保存
        </button>
      </div>

      <div className="todo-stats">
        <p>全てのタスク：{todos.length}</p>
        <p>完了済み：{completedCount}</p>
        <p>未完了：{uncompletedCount}</p>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            setEditingId={setEditingId}
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
