import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Grid,
    Paper,
    ThemeProvider,
    createTheme,
    CssBaseline,
    Divider,
    Icon,
    Avatar,
} from '@mui/material';
import { AssignmentTurnedIn, ErrorOutline, Today, FolderSpecial } from '@mui/icons-material';
import Layout from '../Layout';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f0f2f5', // Slightly lighter background
        },
        text: {
            primary: '#333',
            secondary: '#555',
        },
    },
    typography: {
        h4: {
            fontWeight: 700,
            color: '#1976d2',
            marginBottom: '16px',
        },
        h5: {
            fontWeight: 600,
            color: '#1976d2',
        },
        h6: {
            fontWeight: 600,
            color: '#555',
        },
        body2: {
            color: '#777',
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '16px',
                    marginBottom: '16px',
                    backgroundColor: '#fff',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0px 15px 30px rgba(0,0,0,0.15)',
                    },
                },
            },
        },
    },
});

const ComplianceList = () => {
    const [compliances, setCompliances] = useState([]);
    const backgroundColors = ['#FFFFFF', '#E3F2FD'];

    useEffect(() => {
        const fetchCompliances = async () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const date = `${year}-${month}`;
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/tracker/get_upcoming/${date}`, { withCredentials: true });
                setCompliances(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching compliance data:", error);
                setCompliances([]);
            }
        };

        fetchCompliances();
    }, []);

    const renderDashboardCard = (title, count, IconComponent, color) => (
        <Grid item xs={12} sm={6} md={3}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: color,
                    color: '#fff',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '120px',
                        height: '120px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        zIndex: 0,
                    }
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ zIndex: 1 }}
                >
                    <Avatar sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.3)', width: 56, height: 56 }}>
                        <IconComponent fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>{count}</Typography>
                </Box>
            </Paper>
        </Grid>
    );

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container sx={{ marginTop: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3}>
                                <Typography variant="h4" gutterBottom>
                                    Welcome to your Dashboard
                                </Typography>
                                <Grid container spacing={3} alignItems="center">
                                    {renderDashboardCard('Not Due', 398, AssignmentTurnedIn, '#43a047')}
                                    {renderDashboardCard('Overdue', 462, ErrorOutline, '#e64a19')}
                                    {renderDashboardCard('Due Today', 19, Today, '#f9a825')}
                                    {renderDashboardCard('Company Folios', 1, FolderSpecial, '#0288d1')}
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3}>
                                <Typography variant="h4" gutterBottom>
                                    Upcoming Compliances
                                </Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <List>
                                    {compliances.map((compliance, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                padding: 2,
                                                backgroundColor: backgroundColors[index % backgroundColors.length],
                                                marginBottom: '8px',
                                                borderRadius: '8px',
                                                boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    marginRight: 2,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#1976d2',
                                                    color: '#fff',
                                                    borderRadius: '50%',
                                                    width: 40,
                                                    height: 40
                                                }}
                                            >
                                                <Icon>date_range</Icon>
                                            </Box>
                                            <ListItemText
                                                primary={compliance.description}
                                                secondary={new Date(compliance.dueDate).toDateString()}
                                                primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }}
                                                secondaryTypographyProps={{ color: '#888' }}
                                            />
                                        </ListItem>
                                    ))}
                                    {compliances.length === 0 && (
                                        <Typography variant="body2" sx={{ padding: 2, textAlign: 'center' }}>No compliances available.</Typography>
                                    )}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </Layout>
    );
};

export default ComplianceList;
