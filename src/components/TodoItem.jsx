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
    <li className="todo-item">
      {/* 完了、未完了のチェック */}
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />

      <div className="todo-content">
        {/* Todo部分の表示：　編集モードか通常表示か */}
        {editingId === todo.id ? (
          <input
            type="text"
            value={editText}
            className="edit-input"
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter") {
                updateTodo();
              }
            }}
          />
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </div>

      {/* ボタンの表示：　編集ボタンか保存ボタンか */}
      <div className="todo-buttons">
        {editingId === todo.id ? (
          <button className="btn btn-save" onClick={updateTodo}>
            保存
          </button>
        ) : (
          <button
            className="btn btn-edit"
            onClick={() => {
              setEditingId(todo.id);
              setEditText(todo.text);
            }}
          >
            編集
          </button>
        )}

        <button className="btn btn-delete" onClick={() => deleteTodo(todo.id)}>
          削除
        </button>
      </div>
    </li>
  );
}
