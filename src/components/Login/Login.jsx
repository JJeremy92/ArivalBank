import React, { useState, useEffect, useMemo } from "react";
import fetch from "node-fetch";
import Select from "../Select/Select";
import Input from "../Input/Input";
import { validation } from "../../utils/validation";
import "./index.css";

export default ({ onNextStage, buttonText, currentStage }) => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [error, setError] = useState({});

  const canInfoContinue = useMemo(() => {
    setError({});
    return !!username && !!email && !!currentCountry;
  }, [currentCountry, email, username]);

  const canPasswordContinue = useMemo(() => {
    setError({});
    return !!password && !!passwordRepeat;
  }, [password, passwordRepeat]);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const countryNames = data.map((country) => ({
      label: country.name.common,
      value: country.name.official,
    }));
    setCountries(countryNames);
  };

  const handleCountryChange = (country) => {
    setCurrentCountry(country);
  };

  const handleUsernameChange = (ev) => {
    setUsername(ev.target.value);
  };

  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handlePasswordRepeatChange = (ev) => {
    setPasswordRepeat(ev.target.value);
  };
  const handleInfoContinue = (ev) => {
    ev.preventDefault();
    const nameValid = validation("username", username);
    const emailValid = validation("email", email);
    if (nameValid.valid && emailValid.valid && !!currentCountry.value) {
      onNextStage(currentStage + 1);
    } else {
      setError({
        ...error,
        username: !nameValid.valid ? nameValid.message : "",
        email: !emailValid.valid ? emailValid.message : "",
      });
    }
  };

  const handlePasswordContinue = (ev) => {
    ev.preventDefault();

    const passwordValid = validation("password", password);
    console.log(password, passwordRepeat);

    if (passwordValid.valid && password === passwordRepeat) {
      onNextStage(currentStage + 1);
    } else {
      setError({
        ...error,
        repeat: password === passwordRepeat ? "" : "Passwords do not match!",
        password: !passwordValid.valid ? passwordValid.message : "",
      });
    }
  };

  const handleCompleteContinue = () => {
    onNextStage(0);
  };

  const viewForStage = (stage) => {
    if (stage === 0) {
      return (
        <>
          <div className="login__form__control">
            <Input
              type="text"
              id="username"
              placeholder={"Input username"}
              onChange={handleUsernameChange}
              label={"Username"}
              errorText={error.username}
            />
          </div>
          <div className="login__form__control">
            <Input
              type="email"
              id="email"
              placeholder={"Input email"}
              onChange={handleEmailChange}
              label={"Email"}
              errorText={error.email}
            />
          </div>
          <div className="login__form__control">
            <label htmlFor="password">Country</label>
            <Select
              options={countries}
              placeholder="Select Country"
              onSelect={(country) => handleCountryChange(country)}
            />
          </div>
          <button
            type="submit"
            className="login__submit__button"
            disabled={!canInfoContinue}
            onClick={handleInfoContinue}
          >
            {buttonText}
          </button>
        </>
      );
    } else if (stage === 1) {
      return (
        <>
          <div className="login__form__control">
            <Input
              type="password"
              id="password"
              placeholder={"Input password"}
              onChange={handlePasswordChange}
              label={"Password"}
              errorText={error.password}
            />
          </div>
          <div className="login__form__control">
            <Input
              type="password"
              id="passwordRepeat"
              placeholder={"Repeat password"}
              onChange={handlePasswordRepeatChange}
              label={"Repeat password"}
              errorText={error.repeat}
            />
          </div>
          <button
            type="submit"
            className="login__submit__button"
            disabled={!canPasswordContinue}
            onClick={handlePasswordContinue}
          >
            {buttonText}
          </button>
        </>
      );
    } else if (stage === 2) {
      return (
        <>
          <div className="user-info">
            <div className="review-info-field">
              <p className="info-header">Username</p>
              <p className="info-content">{username}</p>
            </div>
            <div className="review-info-field">
              <p className="info-header">Email</p>
              <p className="info-content">{email}</p>
            </div>
            <div className="review-info-field">
              <p className="info-header">Country</p>
              <p className="info-content">{currentCountry.value}</p>
            </div>
          </div>
          <button
            type="submit"
            className="login__submit__button"
            onClick={handleCompleteContinue}
          >
            {buttonText}
          </button>
        </>
      );
    }
  };
  return <form className="login-container">{viewForStage(currentStage)}</form>;
};
