import { AccountCircle } from "@mui/icons-material";

import { ReactComponent as StoreLogo } from "../../assets/result.svg";
import {
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Navbar = () => {
  const [isConnected, setIsConnected] = useState(
    sessionStorage.getItem("userName") === null ? false : true,
  );
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("userName");
    setIsConnected(false);
  };

  useEffect(() => {
    sessionStorage.getItem("userName") === null
      ? setIsConnected(false)
      : setIsConnected(true);
  }, [sessionStorage.getItem("userName")]);

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
      <Grid container xs={8} item style={{ marginTop:"10px" }}>
        <Grid
          lg={2}
          container
          item
          justifyContent={"center"}
          display={"flex"}
          style={{ height: "50%" }}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid
            container
            item
            lg={8}
            display={"flex"}
            justifyContent={"center"}
          >
            <StoreLogo
              style={{
                maxWidth: "90%",
                maxHeight: "80%",
              }}
              onClick={() => navigate("/")}
            />
          </Grid>
        </Grid>
        <Grid lg={9} item></Grid>
        <Grid
          lg={1}
          display={"flex"}
          container
          item
          flexDirection={"column"}
          alignContent={"center"}
          sx={{ height: "0px" }}
        >
          {isConnected === false ? (
            <Grid
              container
              item
              lg={6}
              display={"flex"}
              
              justifyContent={"center"}
            >
              <Tooltip title={`Connected as Guest, Tap to Login`}>
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
              </Tooltip>
            </Grid>
          ) : (
            <Grid item >
              <Tooltip
                title={`Connected as ${sessionStorage.getItem(
                  "userName",
                )} ,Tap to Logout`}
              >
                <Button onClick={() => handleLogOut()}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {sessionStorage.getItem("userName")[0]}
                  </Avatar>
                </Button>
              </Tooltip>
            </Grid>
          )}
          <Grid lg={6} item>
            <Badge badgeContent={4} color="primary">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate("/login")}
                color="inherit"
              >
                <ShoppingCartIcon />
              </IconButton>
            </Badge>
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
