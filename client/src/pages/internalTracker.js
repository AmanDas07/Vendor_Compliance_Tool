import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Grid,
    Modal,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const InternalTrackers = () => {
    const Router = useNavigate();
    const [locations, setLocations] = useState([]); // Holds location options
    const [companies, setCompanies] = useState([]); // Holds company options
    const [category, setCategories] = useState([]);
    const [owners, setOwners] = useState([]);
    const [managers, setManagers] = useState([]);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // State for session expiration modal
    const [sessionModalOpen, setSessionModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserInfoAndUsers = async () => {
            try {
                const { data } = await api.get('http://localhost:3001/api/v1/detail/userinfo');
                console.log(data.companyDetails);
                setCompanies([data.companyDetails.company_name]); // Populate companies
                setLocations(data.companyDetails.locations); // Populate locations
                if (data.companyDetails.company_name) {
                    const response = await api.post('http://localhost:3001/api/v1/detail/Users', {
                        company: data.companyDetails.company_name,
                    });
                    setData(response.data);
                    setFilteredData(response.data);
                }
            } catch (error) {
                if (error.response.status === 401) {
                    // Open session expiration modal
                    setSessionModalOpen(true);
                }
                console.error("Error fetching data:", error);
            }
        };
        fetchUserInfoAndUsers();
    }, []);

    useEffect(() => {
        const fetchUserInfoAndUsers = async () => {
            try {
                const { data } = await api.get('http://localhost:3001/api/v1/company-detail/companyinfo');
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchUserInfoAndUsers();
    }, []);

    // State to manage the modal open/close
    const [openModal, setOpenModal] = useState(false);

    // State to hold the form data
    const [prefillData, setPrefillData] = useState({
        company: '',
        category: '',
        managers: '',
        owners: '',
        complianceActivity: '',
        description: '',
        location: '',
        formType: 'Internal Form', // Default value
        internalForm: '',
        actRuleGrouping: '',
        sectionDescription: '',
        consequence: '',
        risk: 'Low', // Default risk value
    });

    // Function to open the modal
    const handleAddTracker = () => {
        setOpenModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', prefillData);
        setOpenModal(false);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPrefillData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleBulkImport = () => {
        Router('/bulk-import');
    };

    // Function to close the session expiration modal and redirect
    const handleSessionModalClose = () => {
        setSessionModalOpen(false);
        Router('/login');
    };

    return (
        <Layout>
            {/* Session Expiration Modal */}
            <Modal
                open={sessionModalOpen}
                onClose={handleSessionModalClose}
                aria-labelledby="session-expired-modal-title"
                aria-describedby="session-expired-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%', // Adjust width to fit smaller screens
                        maxWidth: 400, // Max width for larger screens
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        id="session-expired-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 2, color: 'red', fontWeight: 'bold' }}
                    >
                        Session Expired
                    </Typography>
                    <Typography id="session-expired-modal-description" sx={{ mb: 4 }}>
                        Your session has expired. Please log in again to continue.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSessionModalClose}
                        sx={{ bgcolor: 'darkblue' }}
                    >
                        Go to Login
                    </Button>
                </Box>
            </Modal>

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Container maxWidth="md">
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: 'sans-serif',
                                        fontWeight: 600,
                                        color: 'darkblue',
                                        mb: 3,
                                    }}
                                >
                                    Internal Trackers
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textAlign: 'center',
                                        color: 'gray',
                                    }}
                                >
                                    No internal trackers to display. Click "Add Tracker" or "Bulk Import" to start adding
                                    new internal trackers.
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    mt: 2,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddTracker}
                                    sx={{
                                        bgcolor: 'darkblue',
                                        px: 4,
                                        py: 1,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                    }}
                                >
                                    + Add Tracker
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleBulkImport}
                                    sx={{
                                        px: 4,
                                        py: 1,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                    }}
                                >
                                    Bulk Import
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="add-tracker-modal-title"
                aria-describedby="add-tracker-modal-description"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        overflowY: 'auto',
                        maxHeight: '90vh',
                    }}
                >
                    <Typography id="add-tracker-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Add Tracker
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="company-label">Company</InputLabel>
                        <Select
                            labelId="company-label"
                            name="company"
                            value={prefillData.company}
                            onChange={handleInputChange}
                        >
                            {companies.map((company, index) => (
                                <MenuItem key={index} value={company}>
                                    {company}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Category"
                            name="category"
                            value={prefillData.category}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Managers"
                            name="managers"
                            value={prefillData.managers}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Owners"
                            name="owners"
                            value={prefillData.owners}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Compliance Activity"
                            name="complianceActivity"
                            value={prefillData.complianceActivity}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Description"
                            name="description"
                            value={prefillData.description}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="location-label">Location</InputLabel>
                        <Select
                            labelId="location-label"
                            name="location"
                            value={prefillData.location}
                            onChange={handleInputChange}
                        >
                            {locations.map((location, index) => (
                                <MenuItem key={index} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Internal Form"
                            name="internalForm"
                            value={prefillData.internalForm}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Act, Rule, or Other Grouping"
                            name="actRuleGrouping"
                            value={prefillData.actRuleGrouping}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Section Description"
                            name="sectionDescription"
                            value={prefillData.sectionDescription}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Consequence"
                            name="consequence"
                            value={prefillData.consequence}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="risk-label">Risk</InputLabel>
                        <Select
                            labelId="risk-label"
                            name="risk"
                            value={prefillData.risk}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Layout>
    );
};

export default InternalTrackers;
