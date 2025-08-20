import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';

const steps = ['خدمات', 'سابقه بیماری', 'علائم و توضیحات', 'مدارک'];

export default function StepperService({ activeStep, setActiveStep }) {
  const [completed, setCompleted] = React.useState({});

  return (
    <>
      <div className="">
        <Box sx={{ width: '100%' }}>
          <Stepper className="flex flex-wrap justify-end" activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step className="md:w-1/4 w-1/2 mt-2" key={label} completed={completed[index]}>
                <StepButton
                  style={{ display: 'flex', justifyContent: 'start' }}
                  className="flex justify-start bg-slate-950"
                  color="inherit"
                >
                  <span>{label}</span>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    </>
  );
}
