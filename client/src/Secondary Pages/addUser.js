import React from 'react';
import {
    Container,
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Button,
    Typography,
    Box,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Input,
    FormHelperText
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../Layout';

const roles = ['Vendor 1', 'Vendor 2', 'Vendor 3', 'Vendor 4'];
const companies = ['Company A', 'Company B', 'Company C'];
const locations = ['Location A', 'Location B', 'Location C'];
const lawareas = ['Law Area A', 'Law Area B', 'Law Area C'];

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h6: {
            fontWeight: 600,
        },
    },
});

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4), // Added bottom margin
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const UserForm = () => {
    return (
        <Layout title="Add User">
            <div style={{ marginBottom: '5px' }}>
                <ThemeProvider theme={theme}>
                    <StyledContainer >
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'fantasy' }}>
                            Add New User
                        </Typography>
                        <Box component="form" noValidate autoComplete="off">
                            <StyledPaper elevation={3}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="first-name">First Name</InputLabel>
                                            <Input id="first-name" aria-describedby="first-name-helper-text" />
                                            <FormHelperText id="first-name-helper-text">Enter the first name of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="last-name">Last Name</InputLabel>
                                            <Input id="last-name" aria-describedby="last-name-helper-text" />
                                            <FormHelperText id="last-name-helper-text">Enter the last name of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="email">E-mail</InputLabel>
                                            <Input id="email" aria-describedby="email-helper-text" />
                                            <FormHelperText id="email-helper-text">Enter the e-mail address of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="mobile">Mobile</InputLabel>
                                            <Input id="mobile" aria-describedby="mobile-helper-text" />
                                            <FormHelperText id="mobile-helper-text">Enter the mobile number of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </StyledPaper>

                            <StyledPaper elevation={3}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="role">Vendor Name</InputLabel>
                                            <TextField
                                                select
                                                id="role"
                                                aria-describedby="role-helper-text"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            >
                                                {roles.map((role) => (
                                                    <MenuItem key={role} value={role}>
                                                        {role}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <FormHelperText id="role-helper-text">Select the Vendor Name of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="company">Company</InputLabel>
                                            <TextField
                                                select
                                                id="company"
                                                aria-describedby="company-helper-text"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            >
                                                {companies.map((company) => (
                                                    <MenuItem key={company} value={company}>
                                                        {company}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <FormHelperText id="company-helper-text">Select the company of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="location">Location</InputLabel>
                                            <TextField
                                                select
                                                id="location"
                                                aria-describedby="location-helper-text"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            >
                                                {locations.map((location) => (
                                                    <MenuItem key={location} value={location}>
                                                        {location}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <FormHelperText id="location-helper-text">Select the location of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="lawarea">Lawarea</InputLabel>
                                            <TextField
                                                select
                                                id="lawarea"
                                                aria-describedby="lawarea-helper-text"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                            >
                                                {lawareas.map((lawarea) => (
                                                    <MenuItem key={lawarea} value={lawarea}>
                                                        {lawarea}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <FormHelperText id="lawarea-helper-text">Select the law area of the user.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Add User
                            </Button>
                        </Box>
                    </StyledContainer>
                </ThemeProvider>
            </div>
        </Layout>
    );
};

export default UserForm;
