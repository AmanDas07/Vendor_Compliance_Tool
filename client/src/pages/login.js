import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout.js';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Link, CircularProgress, Box, Paper } from '@mui/material';
import api from '../../src/api.js';
//import BackgroundImage from '../assets/background.jpg'; 
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");
    const Router = useNavigate();



    /* useEffect(() => {
         const fetchCsrfToken = async () => {
             try {
                 const { data } = await axios.get('http://localhost:3001/api/v1/csrf-token');
                 axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken;
                 setCsrfToken(data.csrfToken);
                 console.log('CSRF Token:', data.csrfToken);
                 console.log('Axios Default Headers:', axios.defaults.headers.common); // Log to confirm
             } catch (error) {
                 console.error('Error fetching CSRF token:', error);
             }
         };
         fetchCsrfToken();
     }, []);*/


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = await api.post(`http://localhost:3001/api/v1/auth/login`, {
                email,
                password,
                _csrf: csrfToken
            }, {
                withCredentials: true // Ensures cookies are sent and received
            });
            localStorage.setItem('userRole', data.data.role);
            toast.success("User Logged in Successfully");
            setLoading(false);
            Router(`/dashboard/${data.data.role}`);
            console.log(data.data.role);
        } catch (error) {
            setLoading(false);
            // console.log("Error occurred:", error);
            if (error.response && error.response.data) {
                console.log(error.response + "      " + error.response.data);
                toast.error("Something went wrong");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };


    return (
        <Layout>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    p: 3,
                }}
            >
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Container maxWidth="sm">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, backdropFilter: 'blur(10px)', bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
                        <Grid container justifyContent="center" alignItems="center" direction="column">
                            <Typography sx={{ fontFamily: "sans-serif", color: 'darkblue', mb: 2 }} variant="h4" component="h1" gutterBottom >
                                Login
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>

                                <Grid item xs={12} sx={{ mb: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Email address"
                                        variant="outlined"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ mb: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                        sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 1 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!password || !email}
                                        sx={{ bgcolor: 'darkblue', px: 4, py: 1.5, borderRadius: 3, boxShadow: 4 }}
                                    >
                                        {loading ? (
                                            <>
                                                <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                                                Loading
                                            </>
                                        ) : (
                                            'Login'
                                        )}
                                    </Button>
                                    <Link href="/forgot-password" variant="body2" color="error">
                                        Forgot Password?...
                                    </Link>
                                </Grid>
                            </Box>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </Layout>
    )
}

export default Login;
