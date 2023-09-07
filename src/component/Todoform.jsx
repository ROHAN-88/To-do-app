import React from "react";
import { Formik } from "formik";

import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { Button } from "@mui/material";
import getRandomId from "../util/uniqeId";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/todoSlice";
const Todoform = () => {
  const dispatch = useDispatch();
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
          date: Yup.string().required("Date is required"),
        })}
        onSubmit={(values) => {
          values.id = getRandomId();
          dispatch(addItem(values));
          // console.log(values);
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
              label="Date"
              required
              type="text"
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
