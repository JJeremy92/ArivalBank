import React, { useState } from "react";

import { Login, StageProcess } from "./components";
import "./index.css";

export default () => {
  const stages = ["Initial Info", "Password screen", "Review"];
  const [currentStage, setCurrentStage] = useState(0);

  const handleNextStage = (stage) => {
    setCurrentStage(stage);
  };

  return (
    <div className="App">
      <header className="login-header">
        Super test form
        <p className="stage-header">{stages[currentStage]}</p>
      </header>
      <Login
        onNextStage={handleNextStage}
        currentStage={currentStage}
        buttonText={
          currentStage === stages.length - 1 ? "Complete" : "Continue"
        }
      />
      <div className="stage-content">
        <StageProcess currentStage={currentStage} stages={stages} />
      </div>
    </div>
  );
};
