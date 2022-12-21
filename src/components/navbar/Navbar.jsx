import { AccountCircle } from "@mui/icons-material";

import { ReactComponent as StoreLogo } from "../../assets/result.svg";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
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
        zIndex: 100,
      }}
    >
      <Grid xs={2} container item style={{ border: "1px solid red" }}></Grid>
      <Grid container xs={8} item style={{ border: "1px solid black" }}>
        <Grid
          lg={2}
          container
          item
          justifyContent={"center"}
          display={"flex"}
          style={{ border: "1px solid red", height: "50%" }}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid container lg={8} display={"flex"} justifyContent={"center"}>
            <StoreLogo
              style={{
                maxWidth: "100%",
                maxHeight: "90%",
              }}
              onClick={() => navigate("/")}
            />
          </Grid>
        </Grid>
        <Grid lg={9}></Grid>
        <Grid lg={1}>
          <Grid
            container
            lg={4}
            display={"flex"}
            style={{ border: "1px solid red" }}
            justifyContent={"center"}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => navigate("/login")}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          container
          item
          justifyContent={"center"}
          display={"flex"}
          style={{
            border: "1px solid red",
            height: "50%",
          }}
        >
          <Grid item xs={1}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link to={"/items"} style={{ textDecoration: "none" }}>
              Items
            </Link>
          </Grid>
          {/* <Grid item xs={1}>
            <Link to={"/login"}>Login</Link>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid xs={2} item style={{ border: "1px solid red" }}></Grid>
    </Grid>
  );
};
