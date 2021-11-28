import * as React from "react";
import { Typography, Grid, TextField, Chip } from "@mui/material";
import { Graphviz } from "graphviz-react";
import { DataGrid } from "@mui/x-data-grid";

import style from "../style.module.scss";

import { NFA_DFA, checkString, checkFinalState } from "../calculate";
import { Box } from "@mui/system";

export default function Review(props) {
  const [result, setResult] = React.useState([]);

  let indexes = Object.keys(props.data[0]);
  const updateGraph = (dataTemp) => {
    let drawer = `digraph { 
      rankdir=LR; 
      init[label="",shape=point];
      node[shape=circle];`;

    indexes = indexes.filter((text) => text != "id" && text != "variable");
    dataTemp.map((element) => {
      if (element.init) {
        drawer = drawer.concat(`init->${element.variable};`);
      }
      if (element.final) {
        drawer = drawer.concat(
          `${element.variable.replaceAll(",", "")}[shape=doublecircle];`
        );
      }
      indexes.map((inpt) => {
        drawer = drawer.concat(
          `${element.variable.replaceAll(",", "")}->${element[inpt].replaceAll(
            ",",
            ""
          )}[label=${inpt}];`
        );
      });
    });
    drawer = drawer.concat(`}`);
    return drawer;
  };

  let cols = [];
  indexes.map((index) => {
    cols.push({ field: index, headerName: index.toUpperCase(), width: 200 });
  });

  const [data, setData] = React.useState(
    NFA_DFA(props.data, props.initial, props.final)
  );

  let [drawer, setDrawer] = React.useState(updateGraph(data));

  data.map((element, index) => {
    element["id"] = index;
  });

  React.useEffect(() => {
    if (result.length > 0) {
      setDrawer(
        drawer
          .substring(0, drawer.length - 1)
          .concat(
            `${result.concat(props.initial)}[style=filled,color=green]; }`
          )
      );
      console.log(drawer)
    } else {
      setDrawer(updateGraph(data));
    }
  }, [result]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        DFA Review
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={data} columns={cols} />
          </div>
        </Grid>
        <Grid container className={style.check}>
          <Grid item xs={8} sm={8}>
            <Box>
              <TextField
                fullWidth
                label="Outlined"
                fullWidth
                variant="standard"
                onKeyUp={(e) => {
                  setDrawer(updateGraph(data))
                  setResult(checkString(e.target.value, data, props.initial));
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4} sm={4}>
            {checkFinalState(result, data) ? (
              <Chip label="Accepted" color="success" variant="standard" />
            ) : (
              <Chip label="Rejected" color="error" variant="standard" />
            )}
          </Grid>
          {/* <Grid item xs={12} sm={12}>
              <Typography component="h1">
                {result.join("  ->  ")}
              </Typography>
            </Grid> */}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Graphviz dot={drawer} className="chart" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
