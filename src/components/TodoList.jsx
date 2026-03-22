import React from "react";

export default function TodoList(props) {
  return (
    <div>
      {props.todos.map((todo, index) => (
        <p key={index}>{todo.text}</p>
      ))}
    </div>
  );
}
