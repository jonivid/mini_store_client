import { Button, Grid, Paper } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import Carousel from "react-material-ui-carousel";

export const Home = () => {
  return (
    <Grid
      container
      style={{
        border: "3px solid red",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        style={{ border: "1px solid blue", display: "flex", height: "40vh" }}
      >
        <Grid
          container
          item
          lg={8}
          style={{ border: "1px solid green", display: "flex" }}
          justifyContent={"center"}
        >
          <Grid item></Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        style={{ border: "1px solid blue", display: "flex", height: "40vh" }}
      >
        <Grid item lg={8} style={{ border: "1px solid green" }}></Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        style={{ border: "1px solid blue", display: "flex", height: "40vh" }}
      >
        <Grid item lg={8} style={{ border: "1px solid green" }}></Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        style={{ border: "1px solid blue", display: "flex", height: "40vh" }}
      >
        <Grid item lg={8} style={{ border: "1px solid green" }}></Grid>
      </Grid>
    </Grid>
  );
};
