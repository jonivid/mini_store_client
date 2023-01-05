import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
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
// import { useStyles } from "./loginStyle";
import "./style.css";
import { Controller, useForm } from "react-hook-form";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const classes = useStyles();

  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [formView, setFormView] = useState("login");
  // const [password, setPassword] = useState("");
  const handleLoginValues = (value, key) => {
    setLoginValues({ ...loginValues, [`${key}`]: value });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      familyName: "",
    },
  });
  const pass2 = watch("password");
  const onSubmit = (data) => console.log(data);

  return (
    <GoogleOAuthProvider clientId="893616096-3lq21bti4bmgt6q6hon9j2920esvhivu.apps.googleusercontent.com">
      <Grid
        container
        justifyContent={"center"}
        sx={{
          marginTop: 3,
          display: "flex",
        }}
      >
        <Grid
          container
          lg={8}
          xs={10}
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          sx={{ boxShadow: 3, borderRadius: "8px", height: "70Vh" }}
        >
          {formView === "login" ? (
            <Grid
              item
              container
              display={"flex"}
              justifyContent={"center"}
              style={{
                maxHeight: "100%",
              }}
              lg={6}
              xs={8}
            >
              <Grid
                item
                sx={{
                  height: { lg: "60vh" },
                  width: { lg: "45vh" },
                  marginTop: { lg: "50px" },
                  borderRadius: { lg: "8px" },
                  background: { lg: "white" },
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
                      // marginTop: "20px",
                      borderRadius: "8px",
                    }}
                    container
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Login
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        m: 3,
                        width: { lg: "12vw", md: "22vw", xs: "32vw" },
                      }}
                    >
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
                    <Grid
                      item
                      sx={{
                        m: 3,
                        width: { lg: "12vw", xs: "32vw", md: "22vw" },
                      }}
                    >
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
                    <Grid
                      container
                      item
                      flexDirection={"row"}
                      justifyContent={"center"}
                    >
                      <Typography
                        sx={{ fontWeight: "700", color: "#1976d2" }}
                        className={"login-text"}
                      >
                        Forgot Password ?
                      </Typography>
                    </Grid>
                    <Grid item sx={{ m: 3 }}>
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "20px",
                          width: { lg: "12vw", xs: "32vw", md: "22vw" },
                          fill: "e7507d",
                        }}
                        // className={classes.loginBtn}
                        onClick={() =>
                          dispatch(
                            usersSlice.loginHandler(loginValues, navigate),
                          )
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
                      <Typography
                        sx={{
                          fontWeight: "bolder",
                          marginRight: "5px",
                        }}
                      >
                        Not registered yet?
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bolder", color: "#1976d2" }}
                        className={"login-text"}
                        onClick={() => setFormView("signup")}
                      >
                        Create an Account
                      </Typography>
                    </Grid>
                    <Grid item sx={{ m: 3 }}>
                      <hr style={{ width: "20vw" }} />
                    </Grid>

                    <Grid item className={"google-btn"}>
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
          ) : formView === "signup" ? (
            <Grid
              item
              container
              display={"flex"}
              justifyContent={"center"}
              style={{
                maxHeight: "100%",
              }}
              lg={6}
              xs={8}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item sx={{ m: 5 }}>
                  <Typography sx={{ color: "black", fontWeight: "700" }}>
                    Sign Up
                  </Typography>
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        inputRef={ref}
                        id="outlined-basic"
                        label="First Name"
                        {...field}
                        error={!!errors.firstName}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p style={{ color: "red" }}>
                      {"First name field is mandatory"}
                    </p>
                  )}
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <Controller
                    name="familyName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        id="outlined-basic"
                        label="Family Name"
                        {...field}
                        error={!!errors.familyName}
                      />
                    )}
                  />
                  {errors.familyName && (
                    <p style={{ color: "red" }}>
                      {"Family name field is mandatory"}
                    </p>
                  )}
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        {...field}
                        error={!!errors.email}
                      />
                    )}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{"Email field is mandatory"}</p>
                  )}
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password field is mandatory",
                      minLength: {
                        value: 8,
                        message: "password must be 8 characters or more",
                      },

                      validate: {
                        lowerCase: (value) =>
                          /^(?=.*[a-z])/.test(value) ? true : false,
                        upperCase: (value) =>
                          /^(?=.*[A-Z])/.test(value) ? true : false,
                        number: (value) =>
                          /^(?=.*[0-9])/.test(value) ? true : false,
                        char: (value) =>
                          /^(?=.*[!@#\$%\^&\*])/.test(value) ? true : false,
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        {...field}
                        error={!!errors.password}
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                  />
                  {errors.password && errors.password.type === "minLength" && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}

                  {errors.password && errors.password.type === "lowerCase" && (
                    <p style={{ color: "red", position: "relative" }}>
                      Password must contain at least one lowerCase character
                    </p>
                  )}
                  {errors.password && errors.password.type === "upperCase" && (
                    <p style={{ color: "red", position: "relative" }}>
                      Password must contain at least one upperCase character
                    </p>
                  )}
                  {errors.password && errors.password.type === "number" && (
                    <p style={{ color: "red", position: "relative" }}>
                      Password must contain at least one number
                    </p>
                  )}
                  {errors.password && errors.password.type === "char" && (
                    <p style={{ color: "red", position: "relative" }}>
                      Password must contain at least one special character
                    </p>
                  )}

                  {errors.password && errors.password.type === "required" && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}
                </Grid>

                <Grid item sx={{ m: 2 }}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      validate: {
                        confirmedPass: (value) => value === pass2,
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        id="outlined-basic"
                        label="Confirm Password"
                        {...field}
                        error={!!errors.confirmPassword}
                      />
                    )}
                  />
                  {console.log(errors.confirmedPass)}
                  {/* {errors.confirmPassword &&
                    errors.confirmedPass.type === "confirmedPass" && (
                      <p style={{ color: "red" }}>passwords dont match</p>
                    )} */}
                </Grid>
                <Grid item sx={{ m: 3 }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "20px",
                      width: { lg: "12vw", xs: "32vw", md: "22vw" },
                      fill: "e7507d",
                    }}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  flexDirection={"row"}
                  justifyContent={"center"}
                >
                  <Typography
                    sx={{ fontWeight: "bolder", color: "#1976d2" }}
                    className={"login-text"}
                    onClick={() => setFormView("login")}
                  >
                    Return to Login screen
                  </Typography>
                </Grid>
              </form>
            </Grid>
          ) : null}

          <Grid
            item
            lg={6}
            md={4}
            sx={{ display: { xs: "none", lg: "flex", md: "flex" } }}
          >
            <img
              sx={{ maxWidth: { lg: "100%" }, maxHeight: { lg: "80%" } }}
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
