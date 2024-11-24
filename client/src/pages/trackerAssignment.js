import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    FormControl,
    InputLabel,
    Checkbox,
    Switch,
    FormControlLabel,
    Pagination
} from '@mui/material';
import { Refresh, SaveAlt, CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import Layout from '../Layout';
import api from '../api';

const AssignmentPage = () => {
    const [view, setView] = useState("Basic");
    const [company, setCompany] = useState('');
    const [users, setUsers] = useState('');
    const [location, setLocation] = useState('');
    const [user, setUser] = useState('');
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [locations, setLocations] = useState([]);

    const handleCompanyChange = (event) => setCompany(event.target.value);
    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleUserChange = (event) => setUser(event.target.value);
    const handleViewChange = () => setView(view === "Basic" ? "Advanced" : "Basic");

    useEffect(() => {
        const fetchInfoAndUsers = async () => {
            try {
                const { data } = await api.get('http://localhost:3001/api/v1/detail/userinfo');
                setCompanies([data.companyDetails.company_name]);
                setLocations(data.companyDetails.locations);
                if (data.companyDetails.company_name) {
                    const response = await api.post('http://localhost:3001/api/v1/detail/Users', {
                        company: data.companyDetails.company_name,
                    });
                    setData(response.data);
                    setRows(response.data);
                }
                const Details = await api.post('http://localhost:3001/api/v1/detail/getDetails', { company: data.companyDetails.company_name });
                console.log(Details);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchInfoAndUsers();
    }, []);

    return (
        <Layout>
            <Container maxWidth="lg" style={{ marginBottom: '15px' }}>
                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="h4" gutterBottom>
                        Manage Assignments
                    </Typography>
                </Box>

                {/* Toggle between Basic and Advanced */}
                <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                        control={<Switch checked={view === "Advanced"} onChange={handleViewChange} />}
                        label="Advanced"
                    />
                </Box>

                {/* Filter Form */}
                <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Company</InputLabel>
                                <Select value={company} onChange={handleCompanyChange}>
                                    {companies.map((company, index) => (
                                        <MenuItem key={index} value={company}>
                                            {company}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Location</InputLabel>
                                <Select value={location} onChange={handleLocationChange}>
                                    {locations.map((loc, index) => (
                                        <MenuItem key={index} value={loc}>
                                            {loc}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>User</InputLabel>
                                <Select value={user} onChange={handleUserChange}>
                                    <MenuItem value="Unassigned">Unassigned</MenuItem>
                                    {/* Additional user options can be added here */}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Conditionally render fields based on Basic/Advanced toggle */}
                        {view === "Advanced" && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="State" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Category" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Law Area" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Activity" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Act or Rule" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Start Due Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="End Due Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Periodicity" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Role" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Include Closed Trackers"
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="success" sx={{ mr: 1 }}>Submit</Button>
                        <Button variant="outlined" color="error">Clear</Button>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <IconButton>
                        <Refresh />
                    </IconButton>
                    <Button variant="outlined" startIcon={<SaveAlt />}>Export</Button>
                    <Button variant="contained" color="primary">Select All</Button>
                </Box>

                {/* Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox icon={<CheckBoxOutlineBlank />} checkedIcon={<CheckBox />} />
                                </TableCell>
                                <TableCell>UIN</TableCell>
                                <TableCell>Activity</TableCell>
                                <TableCell>Law Area</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Act or Rule</TableCell>
                                <TableCell>Owners</TableCell>
                                <TableCell>Managers</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">No results found!</TableCell>
                                </TableRow>
                            ) : (
                                rows.map((row) => (
                                    <TableRow key={row.uin}>
                                        <TableCell padding="checkbox">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{row.uin}</TableCell>
                                        <TableCell>{row.activity}</TableCell>
                                        <TableCell>{row.lawArea}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.dueDate}</TableCell>
                                        <TableCell>{row.actOrRule}</TableCell>
                                        <TableCell>{row.owners}</TableCell>
                                        <TableCell>{row.managers}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={10} color="primary" />
                </Box>
            </Container>
        </Layout>
    );
};

export default AssignmentPage;
