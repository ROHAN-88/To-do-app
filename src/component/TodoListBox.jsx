import react from "react";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../Loader/Loader";
import { getItem, removeItem } from "../lib/todoApi";
const TodoListBox = () => {
  //!Query in use

  const { data, isLoading } = useQuery({
    queryKey: ["get-item"],
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
  const deleteItem = useMutation({
    mutationKey: ["delete-item"],
    mutationFn: (id) => removeItem(id),
    onSuccess: () => {
      //?invalidate queris
      queryClient.invalidateQueries("get-item");
    },
  });
  //?calling mutain loading======
  if (deleteItem.isLoading) {
    {
      return <Loader />;
    }
  }

  //?=============second Mutation===============
  //!problem
  const deleteAll = useMutation({
    mutationKey: "remove-all",
    mutationFn: () => removeAll(),
    onSuccess: () => {
      queryClient.invalidateQueries("get-item");
    },
  });
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

            <div
              className="button-class"
              style={{ display: "flex", gap: "1rem" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  deleteItem.mutate(productId);
                }}
              >
                Remove
              </Button>
              <Button variant="outline" sx={{ color: "red" }}>
                Edit
              </Button>
            </div>
          </div>
        );
      })}
      <Button
        variant="contained"
        onClick={() => {
          deleteAll.mutate();
        }}
      >
        Clear
      </Button>
    </div>
  );
};

export default TodoListBox;
