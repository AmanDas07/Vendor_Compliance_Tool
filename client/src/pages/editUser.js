import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Button, TextField, Select, MenuItem,
    FormControl, InputLabel, Typography, Divider
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom'; // For fetching the userId from URL params
import api from '../api'; // Assuming you have an api setup
import Layout from '../Layout'; // Assuming you have a Layout component


// Make sure this is correctly capturing the userId


// Define theme
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#d32f2f' },
    },
    typography: {
        h6: { fontWeight: 600 },
        body2: { color: '#333333' },
    },
    spacing: 8,
});

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(6),
    padding: theme.spacing(6),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(3, 0),
    backgroundColor: '#1976d2',
}));

const EditUser = () => {
    const { userId } = useParams(); // Get userId from URL params
    const [userInfo, setUserInfo] = useState({});
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [lawArea, setLawArea] = useState('');
    const [role, setRole] = useState('');
    console.log('UserId:', userId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            // Fetch user data for editing (assuming endpoint is correct)
            try {
                const { data } = await api.get('http://localhost:3001/api/v1/detail/userinfo');
                setUserInfo(data);
                setCompany(data.companyDetails.company_name);
                setLocation(data.companyDetails.locations[0]);
                setLawArea(data.companyDetails.lawArea[0]);
                setRole(data.role);
                console.log(data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            const response = await api.put(`http://localhost:3001/api/v1/detail/update-user/${userId}`, {
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                role: userInfo.role,
                company: userInfo.company,
                location: userInfo.location,
                lawArea: userInfo.lawArea,
            });

            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };


    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Typography variant="h6" color="primary" mb={3}>Edit User</Typography>
                    <Grid container spacing={3}>
                        {/* First Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={userInfo.name?.split(' ')[0] || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, name: `${e.target.value} ${userInfo.name?.split(' ').slice(1).join(' ')}` })}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={userInfo.name?.split(' ').slice(1).join(' ') || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, name: `${userInfo.name?.split(' ')[0]} ${e.target.value}` })}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: true,
                                }}

                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="E-mail"
                                value={userInfo.email || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        {/* Mobile */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                value={userInfo.phone || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}

                            />
                        </Grid>
                    </Grid>

                    <StyledDivider variant="fullWidth" />

                    {/* Role, Company, Location, Law Area */}
                    <Grid container spacing={3}>
                        {/* Role */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                value={userInfo.role || ''}
                                onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: true
                                }}
                            />

                        </Grid>


                        {/* Company */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink>Company</InputLabel>
                                <Select
                                    value={company || ''}  // Ensure company value matches an available option
                                    onChange={(e) => setCompany(e.target.value)}
                                    label="Company"
                                >
                                    {

                                    }
                                    <MenuItem value="Company 1">Company 1</MenuItem>
                                    <MenuItem value="Company 2">Company 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Location */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink>Location</InputLabel>
                                <Select value={location || ''} onChange={(e) => setLocation(e.target.value)} label="Location">
                                    <MenuItem value="Location 1">Location 1</MenuItem>
                                    <MenuItem value="Location 2">Location 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* LawArea */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel shrink>Law Area</InputLabel>
                                <Select
                                    value={location || ''}  // Ensure location value matches an available option
                                    onChange={(e) => setLocation(e.target.value)}
                                    label="Location"
                                >
                                    <MenuItem value="Location 1">Location 1</MenuItem>
                                    <MenuItem value="Location 2">Location 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Update Button */}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                                fullWidth
                                sx={{ marginTop: '24px' }}
                            >
                                Update User Info
                            </Button>
                        </Grid>
                    </Grid>
                </StyledContainer>
            </ThemeProvider>
        </Layout>
    );
};

export default EditUser;
