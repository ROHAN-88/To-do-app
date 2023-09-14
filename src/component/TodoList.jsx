import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, removeAItem } from "../store/todoSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getItem, removeItem } from "../lib/todoApi";
import Loader from "../Loader/Loader";

//todo:push to github with sir algorithm

const TodoList = () => {
  //!Query in use

  const { data, isLoading } = useQuery({
    queryKey: "get-item",
    queryFn: () => getItem(),
  });
  //?calling query loading
  if (isLoading) {
    return <Loader />;
  }
  //!product data path define
  const productData = data?.data;

  //!mutaion
  //?this is important as it is use to invalidate queris==================
  const queryClient = useQueryClient();
  //?=======================================
  const { mutate, isLoading: mutationlodaing } = useMutation({
    mutationKey: ["delete-item"],
    mutationFn: (id) => removeItem(id),
    onSuccess: () => {
      //?invalidate queris
      queryClient.invalidateQueries("get-item");
    },
  });
  //?calling mutain loading======
  if (mutationlodaing) {
    {
      return <Loader />;
    }
  }
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
      {productData?.map((item) => {
        const productId = item._id;
        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>{item.name}</h3>
            <h3>{item.date}</h3>
            <Button
              variant="contained"
              onClick={() => {
                mutate(productId);
              }}
            >
              Remove
            </Button>
          </div>
        );
      })}
      <Button
        variant="contained"
        onClick={() => {
          console.log("hello");
        }}
      >
        Clear
      </Button>
    </div>
  );
};

export default TodoList;
