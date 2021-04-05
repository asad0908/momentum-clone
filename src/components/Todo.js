import React, { forwardRef } from "react";
import "../css/Todo.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const Todo = forwardRef(({ todo, completeTodo, editTodo, deleteTodo }, ref) => {
  return (
    <div
      ref={ref}
      className={`todo ${todo.completed ? "todo__mainCompleted" : ""}`}
    >
      <div
        onClick={() => completeTodo(todo)}
        className={`todo__value ${todo.completed ? "todo__completed" : ""}`}
      >
        <p>{todo.todo}</p>
      </div>
      <div className="todo__buttons">
        {todo.completed && (
          <DoneAllIcon style={{ cursor: "pointer" }} fontSize="small" />
        )}
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => editTodo(todo)}
          fontSize="small"
        />
        <DeleteIcon
          style={{ cursor: "pointer" }}
          onClick={() => deleteTodo(todo.key)}
          fontSize="small"
        />
      </div>
    </div>
  );
});

export default Todo;
