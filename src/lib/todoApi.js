import { $axios } from "./axios";

export const addtodo = async (values) => {
  return $axios.post("/todo/add", values);
};

export const getItem = async () => {
  return $axios.get("/todo/items");
};

export const removeItem = async (id) => {
  return $axios.delete(`/todo/delete/${id}`);
};

export const removeAll = async () => {
  return $axios.delete("/todo/deleteAll");
};
