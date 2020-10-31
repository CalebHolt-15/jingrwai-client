import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export const AuthoriseRoute = ({ component, ...rest }) => {
  if (!localStorage.getItem("token")) return <Redirect to="/signin" />;
  return <Route {...rest} component={component} />;
};
