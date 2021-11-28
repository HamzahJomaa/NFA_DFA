import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import "./App.css";
import Index from "./component/template/";

// $gunmetal: #022f40ff;
// $pacific-blue: #38aeccff;
// $blue-ncs: #0090c1ff;
// $gunmetal-2: #183446ff;
// $blue-sapphire: #046e8fff;

const theme = createTheme({
  palette: {
    primary: {
      main: "#0090c1ff",
    },
    gunmetal: {
      main: "#022f40ff",
      contrastText: "#38aeccff",
    },
    pacificblue: {
      main: "#38aeccff,",
    },
    bluencs: {
      main: "#0090c1ff",
    },
    gunmetal2: {
      main: "#183446ff",
    },
    bluesapphire: {
      main: "#046e8fff",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
        },
      },
      variants: [
        {
          props: { variant: "button", color: "pacificblue" },
          style: {
            backgroundColor: "#38aeccff",
          },
        },
        {
          props: { variant: "button", color: "gunmetal2" },
          style: {
            backgroundColor: "#183446ff",
          },
        },
      ],
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
          position: "absolute",
          left: 0,
        },
      },
    },
    MuiOutlinedInput:{
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          height: "4vh",
        },
      },
    },
    MuiChip:{
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          width: "100%"
        },
      },
    }
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Index />
      </ThemeProvider>
    </div>
  );
}

export default App;
