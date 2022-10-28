// export default Login;
import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Alert } from "@mui/material";
import axiosConfig from "../../api/configapi";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {" ©2022 "}
      <Link color="inherit">Timesheet. Version 4.3.0.0 [20221909]</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const LoginContainer = styled.div`
  background: #00bcd4;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  background: #fff;
`;

export default function Login(props) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [loginFail, setLoginFail] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmitLogin = async (dataSubmit) => {
    axiosConfig({
      method: "post",
      url: "TokenAuth/Authenticate",
      data: {
        userNameOrEmailAddress: dataSubmit.userNameOrEmailAddress,
        password: dataSubmit.password,
        rememberClient: dataSubmit.rememberClient,
      },
    })
      .then((data) => {
        if (data?.data?.result?.accessToken) {
          console.log(data.data.result.accessToken);
          localStorage.setItem("token", data.data.result.accessToken);
          setLoginSuccess(true);
          setLoginFail(false);
          navigate("/home");
        }
      })
      .catch((err) => {
        setLoginFail(true);
        console.log(err);
      });
    // axios({
    //   method: "post",
    //   url: "http://dev-api-timesheet.nccsoft.vn/api/TokenAuth/Authenticate",
    //   data: {
    //     userNameOrEmailAddress: dataSubmit.userNameOrEmailAddress,

    //     password: dataSubmit.password,
    //     rememberClient: dataSubmit.rememberClient,
    //   },
    // })
    //   .then((data) => {
    //     console.log(data);
    //     if (data?.result?.accessToken) {
    //       setLoginSuccess(true);
    //     }
    //     setLoginFail(false);
    //     navigate("/home");
    //   })
    //   .catch((err) => {
    //     setLoginFail(true);
    //     console.log(err);
    //   });
  };

  return (
    <>
      {loginFail && (
        <Alert severity="error">Username hoặc mật khẩu không đúng</Alert>
      )}
      <LoginContainer>
        <Form>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(handleSubmitLogin)}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    // {...register("username")}
                    {...register("userNameOrEmailAddress")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", { required: true })}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </Form>
      </LoginContainer>
    </>
  );
}
