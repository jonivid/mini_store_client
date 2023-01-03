import { Button, Grid, Paper, Typography } from "@mui/material";
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
        item
        container
        display={"flex"}
        justifyContent={"center"}
        // sx={{ marginTop: "0px" }}
        style={{ border: "1px solid blue", height: "40vh" }}
      >
        <Grid
          container
          item
          lg={8}
          display={"flex"}
          style={{ border: "1px solid green" }}
          justifyContent={"center"}
        >
          <Grid item>
            <Typography>
              The Best Cloud Hosting for Your Next Web Project
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        display={"flex"}
        style={{ border: "1px solid blue", height: "40vh" }}
      >
        <Grid item lg={8} style={{ border: "1px solid green" }}></Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        display={"flex"}
        style={{ border: "1px solid blue", height: "40vh" }}
      >
        <Grid item lg={8} style={{ border: "1px solid green" }}></Grid>
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        display={"flex"}
        style={{ border: "1px solid blue", height: "40vh" }}
      >
        <Grid item lg={8} style={{ border: "1px solid green" }}></Grid>
      </Grid>
    </Grid>
  );
};
