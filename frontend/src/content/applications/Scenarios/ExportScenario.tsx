import {

  Step,
  StepLabel,
  Stepper,
  
} from '@mui/material';
import React from 'react';

interface ExportScenarioProps {
  handleClose?: () => void;
  scenario: any;
}

const ExportScenario = (props: ExportScenarioProps) => {
  const steps = ['Select Scenario', 'Export'];
  return (
    <Stepper activeStep={1} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ExportScenario;
