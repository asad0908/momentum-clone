import React, { useState } from "react";
import "../css/InputTask.css";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

const InputTask = () => {
  const [taskInput, setTaskInput] = useState("");
  const [task, setTask] = useState(
    localStorage.getItem("today")
      ? JSON.parse(localStorage.getItem("today"))
      : null
  );

  const setTodayTask = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem(
        "today",
        JSON.stringify({
          t: taskInput,
          completed: "false",
        })
      );
      setTask({
        t: taskInput,
        completed: false,
      });
    }
  };

  const setTaskCompleted = () => {
    const getTask = JSON.parse(localStorage.getItem("today"));
    const newTask = {
      ...getTask,
      completed: getTask.completed === "false" ? "true" : "false",
    };
    localStorage.setItem("today", JSON.stringify(newTask));
    setTask(newTask);
  };

  const removeToday = () => {
    localStorage.removeItem("today");
    setTask(null);
    setTaskInput("");
  };

  return (
    <div className="inputTask">
      {task ? (
        <>
          <h1 style={{ color: "#fff" }}>TODAY</h1>
          <div className="inputTaskCheckbox">
            <span
              onClick={setTaskCompleted}
              className={`checkboxBox ${
                task.completed === "true" ? "checkboxBoxTicked" : ""
              }`}
            >
              {task.completed === "true" && (
                <CheckIcon
                  fontSize="default"
                  style={{ fill: "#fff" }}
                  className="checkIcon"
                />
              )}
            </span>
            <h1 onClick={setTaskCompleted}>{task.t}</h1>
            <IconButton
              onClick={removeToday}
              style={{ padding: "5px", marginTop: "10px", marginLeft: "-5px" }}
            >
              <AddIcon
                className={`addIconButton ${
                  task.completed === "true" ? "addIconButtonRotated" : ""
                }`}
                style={{
                  fill: "#fff",
                  opacity: "0.7",
                  transition: "all 0.2s ease-in",
                }}
              />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          <h1>What is your main focus for today?</h1>
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={setTodayTask}
            type="text"
          />
        </>
      )}
    </div>
  );
};

export default InputTask;
