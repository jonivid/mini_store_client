import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import * as usersSlice from "../../store/users/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isloginScreen, setIsLoginScreen] = useState(true);
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });

  const handleLoginValues = (value, key) => {
    setLoginValues({ ...loginValues, [`${key}`]: value });
  };

  return (
    <GoogleOAuthProvider clientId="893616096-3lq21bti4bmgt6q6hon9j2920esvhivu.apps.googleusercontent.com">
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid
          item
          style={{
            height: "60vh",
            width: "45vh",
            marginTop: "50px",
            borderRadius: "8px",
            background: "#e1f4f3",
          }}
          container
          flexDirection={"column"}
          alignItems={"center"}
        >
          {isUserLoggedIn === false ? (
            <Grid
              item
              style={{
                height: "60vh",
                width: "45vh",
                marginTop: "50px",
                borderRadius: "8px",
              }}
              container
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Grid item>{isloginScreen === true ? "Login" : "SignUp"}</Grid>
              <Grid item sx={{ m: 3 }}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => handleLoginValues(e.target.value, "email")}
                />
              </Grid>
              <Grid item sx={{ m: 3 }}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    handleLoginValues(e.target.value, "password")
                  }
                />
              </Grid>
              <Grid sx={{ m: 3 }}>
                <Button
                  variant="contained"
                  style={{ borderRadius: "8px" }}
                  onClick={() =>
                    dispatch(usersSlice.loginHandler(loginValues, navigate))
                  }
                >
                  Login
                </Button>
              </Grid>
              <Grid item sx={{ m: 3 }}>
                <hr style={{ width: "20vw" }} />
              </Grid>

              <Grid item>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    setCredentials(credentialResponse);
                    setUser(jwtDecode(credentialResponse.credential));
                    setIsUserLoggedIn(true);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  shape={"pill"}
                  // useOneTap
                  type="standard"
                  text="signin_with"
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Grid item>Do you wish to continue as :</Grid>
              <Grid item>
                <img src={user.picture} alt={"no pic"} />
              </Grid>
              <Grid item>
                {user.family_name} {user.given_name}
              </Grid>
              <Grid item container display={"flex"} justifyContent={"center"}>
                <Grid item>
                  <Button
                    onClick={() => {
                      googleLogout();
                      setIsUserLoggedIn(false);
                      setUser({});
                      setCredentials({});
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      dispatch(
                        usersSlice.loginWithGoogle(credentials, navigate),
                      );
                    }}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </GoogleOAuthProvider>
  );
};
