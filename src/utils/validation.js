import { isEmail } from "validator";

const validateUsername = (name) => {
  if (name.length < 4 || name.length > 12)
    return {
      valid: false,
      message: "Username is not valid",
    };
  return { valid: true };
};

const validateEmail = (email) => {
  if (isEmail(email)) {
    return { valid: true };
  }
  return {
    valid: false,
    message: "Email is not valid",
  };
};

const validatePassword = (password) => {
  if (password.length < 8 || password.length > 16) {
    return {
      valid: false,
      message: "Password is not valid",
    };
  }
  return { valid: true };
};

export const validation = (type, value) => {
  switch (type) {
    case "username": 
      return validateUsername(value);
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    default:
      return { valid: false };
  }
}
