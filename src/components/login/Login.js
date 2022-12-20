import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import * as usersSlice from "../../store/users/usersSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const [isloginScreen, setIsLoginScreen] = useState(true);
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <GoogleOAuthProvider clientId="893616096-3lq21bti4bmgt6q6hon9j2920esvhivu.apps.googleusercontent.com">
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid
          item
          style={{
            border: "1px solid red",
            height: "60vh",
            width: "45vh",
            marginTop: "50px",
            borderRadius: "8px",
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
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <hr style={{ width: "20vw" }} />
              </Grid>

              <Grid item>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
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
                        setUser({})
                        setCredentials({})
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      dispatch(usersSlice.loginWithGoogle(credentials));
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
