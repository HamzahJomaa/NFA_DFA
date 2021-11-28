import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";

export default function Index(props) {
  const getStates = (stateNumber) => {
    let content = [];
    for (let index = 1; index <= stateNumber; index++) {
      content.push(`q${index}`);
    }
    return content;
  };

  const [data, setData] = React.useState([]);
  const [init, setInit] = React.useState([]);
  const [final, setFinal] = React.useState([]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="languages"
            name="languages"
            label="Languages"
            fullWidth
            variant="standard"
            onChange={(e) => {
              props.setLanguage(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="states"
            label="States"
            fullWidth
            variant="standard"
            onChange={(e) => {
              props.setStates(e.target.value);
              setData(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" variant="secondary">Initial State</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={init}
              label="Country"
              variant="standard"
              fullWidth
              name="country"
              onChange={(e) => {
                setInit(e.target.value);
                props.setInit(e.target.value);
              }}
            >
              {getStates(data).map((element) => {
                return <MenuItem value={element}>{element}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" variant="secondary">Final State</InputLabel>
            <Select
              value={final}
              label="Final State†"
              multiple
              variant="standard"
              fullWidth
              onChange={(e) => {
                setFinal(e.target.value);
                props.setFinal(e.target.value);
              }}
            >
              {getStates(data).map((element) => {
                return <MenuItem value={element}>{element}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
