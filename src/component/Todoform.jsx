import { Formik } from "formik";
import React from "react";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { addtodo } from "../lib/todoApi";
import Loader from "../Loader/Loader";
const Todoform = () => {
  // const dispatch = useDispatch();

  //!@calling mutation
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: (values) => addtodo(values),
    onSuccess: () => {
      queryClient.invalidateQueries("get-item");
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        width: "350px",
        margin: "5rem",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px ",
        padding: "3rem",
        borderRadius: "20px",
      }}
    >
      <Formik
        initialValues={{ name: "", date: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(1, "Must be 1 letter long")
            .required("Required"),
          date: Yup.date().required("Date is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <TextField
              label="Todo"
              required
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-msg">{formik.errors.name}</div>
            ) : null}

            <TextField
              // label="Date"
              required
              type="date"
              {...formik.getFieldProps("date")}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="error-msg">{formik.errors.date}</div>
            ) : null}

            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Todoform;
