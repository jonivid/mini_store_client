import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
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
import {
  AccountCircle,
  CheckBox,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { useStyles } from "./loginStyle";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });

  const handleLoginValues = (value, key) => {
    setLoginValues({ ...loginValues, [`${key}`]: value });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <GoogleOAuthProvider clientId="893616096-3lq21bti4bmgt6q6hon9j2920esvhivu.apps.googleusercontent.com">
      <Grid
        container
        justifyContent={"center"}
        sx={{
          marginTop: 3,
        }}
      >
        <Grid
          container
          lg={8}
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          style={{
            // boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)",
            borderRadius: "8px",
            height: "70Vh",
          }}
          sx={{ boxShadow: 3 }}
        >
          <Grid
            item
            container
            display={"flex"}
            justifyContent={"center"}
            style={{
              maxHeight: "100%",
            }}
            lg={6}
          >
            <Grid
              item
              style={{
                height: "60vh",
                width: "45vh",
                marginTop: "50px",
                borderRadius: "8px",
                background: "white",
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
                  <Grid item>
                    <Typography>
                      {isLoginScreen === true ? "Login" : "SignUp"}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ m: 3, width: "12vw" }}>
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
                      onChange={(e) =>
                        handleLoginValues(e.target.value, "email")
                      }
                    />
                  </Grid>
                  <Grid item sx={{ m: 3, width: "12vw" }}>
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      InputProps={{
                        type: showPassword ? "text" : "password",
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) =>
                        handleLoginValues(e.target.value, "password")
                      }
                    />
                  </Grid>
                  <Grid item sx={{ m: 3 }}>
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: "20px",
                        width: "12vw",
                        fill: "e7507d",
                      }}
                      className={classes.loginBtn}
                      onClick={() =>
                        dispatch(usersSlice.loginHandler(loginValues, navigate))
                      }
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid
                    container
                    item
                    flexDirection={"row"}
                    justifyContent={"center"}
                  >
                    {/* <Grid
                  container
                  item
                  lg={5}
                  flexDirection={"row"}
                  alignItems={"center"}
                > */}
                    <Typography>Forgot Password</Typography>
                    {/* </Grid> */}
                    {/* <Grid item lg={8}>
                  <Typography>Not registered yet? create an Account</Typography>
                </Grid> */}
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
                  <Grid
                    item
                    container
                    display={"flex"}
                    justifyContent={"center"}
                  >
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
          <Grid item lg={6}>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "80%",
              }}
              src={"/images/online-registration.png"}
              alt="Pic is not available"
            />
          </Grid>
        </Grid>
      </Grid>
    </GoogleOAuthProvider>
  );
};
