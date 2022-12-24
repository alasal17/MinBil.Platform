import React from "react";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { UploadImages } from "./UploadImages";
import { CSVReader } from "react-papaparse";

function getSteps() {
  return ["Step1", "Step2", "Step3", "Step4", "Step5"];
}

const Steps = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [autoPopulateData, setAutoPopulateData] = React.useState([]);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data, "ON REMOVE");
  };

  const handleOnDrop = (data) => {
    console.log(data, "ON ADD");
    setAutoPopulateData(data);
    handleNext();
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep < 1 ? (
        <div>
          <Button
            style={{ marginBottom: 5 }}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Add From Scratch
          </Button>
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            noDrag
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}
            style={{ border: 0 }}
          >
            <Button variant="contained" color="primary">
              Upload as CSV
            </Button>
          </CSVReader>
        </div>
      ) : activeStep === 1 ? (
       ''
      ) : (
        <UploadImages></UploadImages>
      )}
    </div>
  );
};

export default Steps;