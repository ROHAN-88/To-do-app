import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, removeAItem } from "../store/todoSlice";

//todo:push to github with sir algorithm

const TodoList = () => {
  const todoState = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  // console.log(todo);
  return (
    <div
      style={{
        margin: "5rem",
        width: "650px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px ",
        padding: "3rem",
        borderRadius: "20px",
      }}
    >
      <h2>To-DO List:</h2>
      {todoState.todoList.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h3>{item.name}</h3>
            <h3>{item.date}</h3>
            <Button
              variant="contained"
              onClick={() => dispatch(removeAItem(item.id))}
            >
              Remove
            </Button>
          </div>
        );
      })}
      <Button
        variant="contained"
        onClick={() => {
          dispatch(clearItem());
        }}
      >
        {" "}
        Clear
      </Button>
    </div>
  );
};

export default TodoList;
