import React, { useState, useEffect } from "react";
import "../css/TodoContainer.css";
import AddIcon from "@material-ui/icons/Add";
import Todo from "./Todo";
import EditIcon from "@material-ui/icons/Edit";
import uuid from "react-uuid";
import FlipMove from "react-flip-move";
import CloseIcon from "@material-ui/icons/Close";

const TodoContainer = ({ setOpenTodoBox }) => {
  const [todo, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);

  const saveTodos = (newTodos) => {
    localStorage.setItem("momentumTodos", JSON.stringify(newTodos));
  };

  useEffect(() => {
    if (localStorage.getItem("momentumTodos")) {
      setTodos(JSON.parse(localStorage.getItem("momentumTodos")));
    }
  }, []);

  const handleTodoInput = (e) => {
    if (todo.length > 2) {
      setTodoValid(true);
    } else {
      setTodoValid(false);
    }
    setTodo(e.target.value);
  };

  const submitTodo = () => {
    if (todoValid) {
      const date = new Date();
      const newTodo = {
        key: uuid(),
        todo: todo.charAt(0).toUpperCase() + todo.slice(1),
        timestamp: date.getTime(),
        completed: false,
      };

      if (!editing) {
        let newTodos = [newTodo, ...todos];
        setTodos(newTodos);
        setTodo("");
        saveTodos(newTodos);
      } else {
        const editableTodo = todos;
        editableTodo[editableIndex] = newTodo;
        setTodos(editableTodo);
        setTodo("");
        saveTodos(editableTodo);
        setEditableIndex(null);
        setEditing(false);
      }
    } else {
      alert("Todo must be greater than 3 letters!");
    }
    setTodoValid(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      submitTodo();
    }
  };

  const deleteTodo = (key) => {
    let newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
    saveTodos(newTodos);
    setTodo("");
  };

  const editTodo = (todo) => {
    setTodo(todo.todo);
    const filteredIndex = todos.findIndex((tod) => tod.key === todo.key);
    setEditing(true);
    setEditableIndex(filteredIndex);
  };

  const completeTodo = (todo) => {
    const filteredIndex = todos.findIndex((tod) => tod.key === todo.key);
    const getAll = JSON.parse(localStorage.getItem("momentumTodos"));

    if (todo.completed) {
      //make todo undone
      getAll[filteredIndex].completed = false;
    } else {
      //make todo done
      getAll[filteredIndex].completed = true;
    }
    saveTodos(getAll);
    setTodos(getAll);
  };

  return (
    <div className="todoContainer">
      <CloseIcon
        onClick={() => setOpenTodoBox(false)}
        className="todoContainer__cancel"
      />
      <div className="todo__input">
        <input
          onKeyDown={handleEnter}
          onChange={handleTodoInput}
          value={todo}
          type="text"
          placeholder="Enter your todo.."
        />
        {editing ? (
          <EditIcon onClick={submitTodo} style={{ cursor: "pointer" }} />
        ) : (
          <AddIcon onClick={submitTodo} style={{ cursor: "pointer" }} />
        )}
      </div>
      <div className="todo__todosContainer">
        <FlipMove typeName={null}>
          {todos.length !== 0 ? (
            todos.map((todo) => (
              <Todo
                key={todo.key}
                todo={todo}
                completeTodo={completeTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <h1 className="noTodo">Add some todos & start hustling!</h1>
          )}
        </FlipMove>
      </div>
    </div>
  );
};

export default TodoContainer;
