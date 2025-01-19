import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Paper,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../context/auth-context";
import request from "../../config/request";
import ParticleBackground from "../../components/particle-background/particle-background";
import { formFields, formSchema } from "./form-config";
import FormController from "../../components/form/controller";
import { useLogIn } from "../../hooks/use-auth";
import { homeRoute } from "../../constants/routes";

type Schema = typeof formSchema._type;
const LoginPage = () => {
  const { mutateAsync: requestLogIn, isPending } = useLogIn();
  const { loginToApp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const justAToken = localStorage.getItem("justAToken");

  const formElements = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitHandler = async (values: Schema) => {
    const res = await requestLogIn(values);
    if (res) {
      localStorage.setItem("justAToken", "Hello from this side");
      loginToApp(res.name, res.expiresIn);
      navigate(homeRoute);
    }
  };

  const { username, password } = formFields;

  useEffect(() => {
    if (isAuthenticated) navigate(homeRoute);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        zIndex: 10,
        // position:'relative',
        // backgroundColor: "#0093E9",
        // backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      }}
      // onContextMenu={(e) => {
      //   e.preventDefault();
      // }}
    >
      <ParticleBackground />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={8}
          sx={{
            position: "relative",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
            backgroundColor: "whitesmoke",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "primary.main",
                width: 56,
                height: 56,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>

            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Welcome {justAToken ? "Back" : ""}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", color: "#555" }}
            >
              Please sign in to continue
            </Typography>
            <FormProvider {...formElements}>
              <Box
                component="form"
                onSubmit={formElements.handleSubmit(submitHandler)}
                noValidate
                mt={2}
              >
                <FormController
                  {...username}
                  margin="dense"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <FormController
                  {...password}
                  margin="dense"
                  sx={{
                    ".MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />

                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: "20px",
                    padding: "10px",
                    fontWeight: "bold",
                    textTransform: "none",
                    background:
                      "linear-gradient(90deg, #ff8a00 0%, #da1b60 100%)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                  loading={isPending}
                >
                  Sign In
                </LoadingButton>
              </Box>
            </FormProvider>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
