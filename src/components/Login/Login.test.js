import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login"; // Import your component

describe("Login", () => {
  it("renders the initial stage correctly", () => {
    const { getByText, getByLabelText } = render(<Login />);
    
    // Verify that the initial stage elements are present
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Country")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("allows user to fill in user information and proceed to the next stage", () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    // Fill in the user information
    fireEvent.change(getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(getByLabelText("Email"), { target: { value: "test@example.com" } });
    
    // Select a country (You may need to mock the fetch API here)
    fireEvent.click(getByLabelText("Country"));
    // Mock the fetch API response
    
    fireEvent.click(getByText("Next"));
    
    // Verify that it proceeds to the next stage
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Repeat password")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("allows user to fill in password information and proceed to the final stage", () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    // Fill in the password information
    fireEvent.change(getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.change(getByLabelText("Repeat password"), { target: { value: "password123" } });
    
    fireEvent.click(getByText("Next"));
    
    // Verify that it proceeds to the final stage
    expect(getByText("Username")).toBeInTheDocument();
    expect(getByText("testuser")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("test@example.com")).toBeInTheDocument();
    expect(getByText("Country")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("allows user to complete and start over", () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    // Fill in the user information
    fireEvent.change(getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(getByLabelText("Email"), { target: { value: "test@example.com" } });
    
    // Select a country (You may need to mock the fetch API here)
    fireEvent.click(getByLabelText("Country"));
    // Mock the fetch API response
    
    fireEvent.click(getByText("Next"));
    
    // Fill in the password information
    fireEvent.change(getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.change(getByLabelText("Repeat password"), { target: { value: "password123" } });
    
    fireEvent.click(getByText("Next"));
    
    // Complete and start over
    fireEvent.click(getByText("Complete"));
    
    // Verify that it starts over at the initial stage
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Country")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });
});