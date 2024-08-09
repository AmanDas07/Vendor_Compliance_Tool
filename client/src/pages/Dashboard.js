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
} from '@mui/material';
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
            default: '#f5f5f5',
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
            color: '#555',
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '12px',
                    marginBottom: '12px',
                    backgroundColor: '#fff',
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
                const response = await axios.get(`http://localhost:8082/api/v1/tracker/get_upcoming/${date}`);
                setCompliances(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching compliance data:", error);
                setCompliances([]);
            }
        };

        fetchCompliances();
    }, []);

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container sx={{ marginTop: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3}>
                                <Typography variant="h4" gutterBottom>
                                    Welcome to your Dashboard.
                                </Typography>

                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={3}>
                                        <Paper elevation={3} sx={{ padding: 1, textAlign: 'center' }}>
                                            <Typography variant="h5">Not Due</Typography>
                                            <Typography variant="h6">398</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper elevation={3} sx={{ padding: 1, textAlign: 'center' }}>
                                            <Typography variant="h5">Overdue</Typography>
                                            <Typography variant="h6">462</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper elevation={3} sx={{ padding: 1, textAlign: 'center' }}>
                                            <Typography variant="h5">Due Today</Typography>
                                            <Typography variant="h6">19</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper elevation={3} sx={{ padding: 1, textAlign: 'center' }}>
                                            <Typography variant="h5">Company Folios</Typography>
                                            <Typography variant="h6">1</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3}>
                                <Typography variant="h4" gutterBottom>
                                    Upcoming Compliances
                                </Typography>
                                <Divider />
                                <List>
                                    {compliances.map((compliance, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                paddingLeft: 0,
                                                backgroundColor: backgroundColors[index % backgroundColors.length],
                                                marginBottom: '8px',
                                                borderRadius: '8px',
                                                boxShadow: '0 10px 16px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <ListItemText
                                                primary={compliance.description}
                                                secondary={new Date(compliance.dueDate).toDateString()}
                                                primaryTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }}
                                            />
                                        </ListItem>
                                    ))}
                                    {compliances.length === 0 && (
                                        <Typography variant="body2">No compliances available.</Typography>
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
