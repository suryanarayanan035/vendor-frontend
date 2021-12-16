import React from "react";

import { Container } from "react-bootstrap";
import Loader from "react-loader-spinner";

import "./formloadspinner.css";
export const FormLoadSpinner = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vertical-center">
      <Loader type="TailSpin" color="blue" secondaryColor="gray"></Loader>
    </Container>
  );
};
