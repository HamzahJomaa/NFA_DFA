import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import AddressForm from "./Descrption";
import InputTable from "./inputTable";
import Review from "./Review";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  "NFA Description",
  "NFA Transition Table",
  "DFA Transition Table",
];

export default function Checkout() {
  const [states, setStatesCount] = React.useState(0);
  const [languages, setLanguages] = React.useState([]);
  const [init, setInit] = React.useState();
  const [final, setFinal] = React.useState();
  const [activeStep, setActiveStep] = React.useState(0);

  const [rows, setRows] = React.useState([]);

  let data = [
    { "1": "q1,q2", "0": "q3", id: 1, variable: "q1" },
    { "1": "q2,q3", "0": "q3,q4", id: 2, variable: "q2" },
    { "1": null, "0": null, id: 3, variable: "q3" },
    { "1": null, "0": null, id: 4, variable: "q4" },
  ];;


  function getStepContent(step) {
    const setLanguage = (data) => {
      setLanguages(data.split(","));
    };

    const setStates = (data) => {
      setStatesCount(data);
    };

    const getInit = (data) => {
      setInit(data);
    };

    const getRows = (data) => {
      setRows(data);
    };

    const getFinal = (data) => {
      setFinal(data.join(","));
    };

    switch (step) {
      case 0:
        return (
          <AddressForm
            setLanguage={setLanguage}
            setStates={setStates}
            setInit={getInit}
            setFinal={getFinal}
          />
        );
      case 1:
        return (
          <InputTable
            updateTable={getRows}
            states={states}
            languages={languages}
            initial={init}
            final={final}
          />
        );
      case 2:
        return <Review data={rows} initial={init} final={final} />;
      default:
        return <Review data={rows} />;
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getButtonName = () => {
    switch (activeStep) {
      case 0:
        return "Next";
        break;
      case 1:
        return "Submit";
        break;
      case 2:
        return "Check";
        break;
    }
  };

  return (
    <>
      <AppBar
        position="absolute"
        color="gunmetal"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Theory of Computation
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        component="div"
        style={{ height: "auto", display: "flex", flexDirection: "column" }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            NFA - DFA
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step color="gunmetal2" key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button
                    color="gunmetal2"
                    variant="button"
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Back
                  </Button>
                )}

                <Button
                  onClick={activeStep === 2? "" : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  color="pacificblue"
                  variant="button"
                >
                  {getButtonName()}
                </Button>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </>
  );  
}
