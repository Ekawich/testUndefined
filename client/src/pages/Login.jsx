import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Alert
} from "@mui/material";

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        setErrors("")

        const expiration = new Date()
        const body = {
            username,
            password,
        };

        if (username && password) {
            const response = await fetch("http://localhost:8000/api/users/login", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.status === 200) {
                expiration.setHours(expiration.getHours() + 1)
                localStorage.setItem('user' , JSON.stringify(data.user))
                localStorage.setItem('token' , JSON.stringify(data.token))
                localStorage.setItem('expiration', expiration.toISOString())
                toast.success(data.message, {
                    autoClose:1500,
                    pauseOnHover:false
                })
                setErrors("")
                setUsername("")
                setPassword("")
                navigate('/dashboard')
            } else {
                setErrors(data.message)
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={e => submitForm(e)} noValidate sx={{ mt: 1 }}>
                    {errors && <Alert severity="error">
                        {errors}
                    </Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
