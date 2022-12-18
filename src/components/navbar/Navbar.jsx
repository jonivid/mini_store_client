import { Grid, Typography } from "@mui/material";
import { positions } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        border: "1px solid black",
        height: "100px",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex:100
      }}
    >
      <Grid xs={2} container item style={{ border: "1px solid red" }}></Grid>
      <Grid container xs={8} item style={{ border: "1px solid black" }}>
        <Grid
          lg={12}
          container
          item
          justifyContent={"center"}
          style={{ border: "1px solid red", height: "50%", display: "flex" }}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid
            container
            lg={4}
            style={{ border: "1px solid red", display: "flex" }}
            justifyContent={"center"}
          >
            <Typography style={{ alignContent: "center" }}>
              Store Icon
            </Typography>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          container
          item
          justifyContent={"center"}
          style={{ border: "1px solid red", height: "50%", display: "flex" }}
        >
          <Grid item xs={1}>
            <Link to={"/"}>Home</Link>
          </Grid>
          <Grid item xs={1}>
            <Link to={"/items"}>Items</Link>
          </Grid>
          <Grid item xs={1}>
            <Link to={"/login"}>Login</Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={2} item style={{ border: "1px solid red" }}></Grid>
    </Grid>
  );
};
