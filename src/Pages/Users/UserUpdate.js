import { Button } from "@material-ui/core";
import Axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

export const UserUpdate = ({ match, history }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    email: Yup.string().email("Invalid email").required("required"),
    password: Yup.string().required("required"),
  });

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values,
      url: `https://localhost:8090/user/${match.params.id}`,
    };

    try {
      const data = await Axios(options);
      history.push("/users/list");
    } catch (e) {
      console.log(e);
    }
  };

  const [oldUser, setOldUser] = useState(null);
  const [User, setUser] = useState(false);

  useEffect(() => {
    setUser(true);
    const getUser = async (values) => {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: values,
        url: `https://localhost:8090/user/${match.params.id}`,
      };
      try {
        const { data } = await Axios(options);
        setOldUser(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [match.params.id]);

  return (
    <Formik
      initialValues={oldUser || initialValues} //display olduser details
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize //display olduser details
    >
      {(props) => {
        return (
          <Form>
            <Field
              component={TextField}
              name="firstName"
              label="First Name"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Field
              component={TextField}
              name="lastName"
              label="Last Name"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Field
              component={TextField}
              name="email"
              label="E-Mail"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Field
              component={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <Button
              fullWidth
              variant="text"
              color="primary"
              type="submit"
              disabled={!props.isValid || props.isSubmitting}
            >
              Update User
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
