import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        cpassword: "",
    });
    const [errors, setErrors] = useState({});

    // ตรวจสอบข้อมูล
    const validate = () => {
        const errors = {};

        if (formData.username === "") {
            errors.username = "Username is required";
        }

        if (formData.password === "") {
            errors.password = "Password is required";
        } else if (formData.password.length < 7) {
            errors.password = "Password should be at least 7 characters long";
        }

        if (formData.cpassword === "") {
            errors.cpassword = "Confirm password is required";
        } else if (formData.cpassword !== formData.password) {
            errors.cpassword = "Password do not match";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const validating = validate();
        const errors = {}
        if (validating) {
            try {
                const body = {
                    username: formData.username,
                    password: formData.password,
                };

                const response = await fetch(
                    "http://localhost:8000/api/users/register",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                if (data.status === 200) {
                    toast.success(data.message, {
                        autoClose:1500,
                        pauseOnHover:false
                    })
                    setFormData({
                        username: "",
                        password: "",
                        cpassword: "",
                    });
                    navigate("/");
                } else {
                    if (data.status === 400) {
                        errors.username = data.message
                        setErrors(errors)
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={submitForm}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            error={errors.username && true}
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            helperText={errors.username || ""}
                            value={formData.username}
                            onChange={(e) => handlerChange(e)}
                        />
                        <TextField
                            error={errors.password && true}
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            helperText={errors.password || ""}
                            value={formData.password}
                            onChange={(e) => handlerChange(e)}
                        />
                        <TextField
                            error={errors.cpassword && true}
                            margin="normal"
                            required
                            fullWidth
                            name="cpassword"
                            label="Confirm Password"
                            type="password"
                            id="cpassword"
                            autoComplete="current-password"
                            helperText={errors.cpassword || ""}
                            value={formData.cpassword}
                            onChange={(e) => handlerChange(e)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Have an account? Log in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
