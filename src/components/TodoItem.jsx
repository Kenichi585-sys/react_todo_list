import React from "react";

export default function TodoItem({
  todo,
  index,
  editingIndex,
  setEditingIndex,
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
        onChange={() => toggleTodo(index)}
      />

      {/* Todo部分が編集モードか通常表示か */}
      {editingIndex === index ? (
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
      {/* ボタンの表示：編集ボタンか保存ボタンか */}
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
  );
}
