import React from "react";

export default function TodoList(props) {
  return (
    <div>
      {props.todos.map((todo) => (
        <p key={todo.id}>{todo.text}</p>
      ))}
    </div>
  );
}
