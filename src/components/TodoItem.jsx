import React from "react";

export default function TodoItem({
  todo,
  editingId,
  setEditingId,
  editText,
  setEditText,
  updateTodo,
  deleteTodo,
  toggleTodo,
}) {
  return (
    <li>
      {/* 完了、未完了のチェック */}
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
      />

      {/* Todo部分の表示：　編集モードか通常表示か */}
      {editingId === todo.id ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateTodo();
            }
          }}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      {/* ボタンの表示：　編集ボタンか保存ボタンか */}
      {editingId === todo.id ? (
        <button onClick={updateTodo}>保存</button>
      ) : (
        <button
          onClick={() => {
            setEditingId(todo.id);
            setEditText(todo.text);
          }}
        >
          編集
        </button>
      )}

      <button onClick={() => deleteTodo(todo.id)}>削除</button>
    </li>
  );
}
