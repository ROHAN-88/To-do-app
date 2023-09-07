import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newTask = action.payload;
      state.todoList = [...state.todoList, newTask];
    },
    clearItem: (state) => {
      state.todoList = [];
    },
    removeAItem: (state, action) => {
      const itemId = action.payload;
      state.todoList = state.todoList.filter((item) => {
        return item.id !== itemId;
      });
    },
  },
});

export const { addItem, clearItem, removeAItem } = todoSlice.actions;

export default todoSlice.reducer;
