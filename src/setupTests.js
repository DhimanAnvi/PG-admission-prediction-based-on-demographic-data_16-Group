import React from "react";
import { render, screen } from "@testing-library/react";
import AdmissionForm from "./AdmissionForm.test.js";

test("renders admission form", () => {
  render(<AdmissionForm />);
  const formTitle = screen.getByText(/University Admission Predictor/i);
  expect(formTitle).toBeInTheDocument();
});
