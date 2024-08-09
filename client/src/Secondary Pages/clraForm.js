import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    MenuItem,
    Select,
    Checkbox,
    ListItemText,
    OutlinedInput
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../Layout';

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
    marginBottom: theme.spacing(4),
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

const locations = [
    'SRR location',
    'BGA location',
    'Eco Space 2A&B location',
    'Eco Space 4B location',
    'Electronic city location',
    'Hyderabad location'
];

const CLRAForm = () => {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [formData, setFormData] = useState({
        userName: '',
        uin: '',
        intelEntity: '',
        contractorName: '',
        contractorAddress: '',
        natureOfWork: '',
        mobileNumber: '',
        contractStartDate: '',
        contractEndDate: '',
        maxMenEmployees: {},
        maxWomenEmployees: {},
        totalEmployees: {},
        latestMaxMenEmployees: {},
        latestMaxWomenEmployees: {},
        latestTotalEmployees: {},
    });

    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedLocations(typeof value === 'string' ? value.split(',') : value);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleNestedInputChange = (location, category, event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [location]: value
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/INTEL_CLRA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('CLRA information updated successfully!');
            } else {
                toast.error(`Error: ${result.message}`);
            }
        } catch (error) {
            toast.error('An error occurred while updating CLRA information.');
        }
    };

    const isFieldVisible = (location) => selectedLocations.includes(location);

    return (
        <Layout title="Add CLRA Information">
            <div style={{ marginBottom: '5px' }}>
                <ToastContainer position="top-center"
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
                <ThemeProvider theme={theme}>
                    <StyledContainer>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'fantasy' }}>
                            Add CLRA Information
                        </Typography>
                        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <StyledPaper elevation={3}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="locations">Select Locations</InputLabel>
                                            <Select
                                                id="locations"
                                                multiple
                                                value={selectedLocations}
                                                onChange={handleLocationChange}
                                                input={<OutlinedInput label="Select Locations" />}
                                                renderValue={(selected) => selected.join(', ')}
                                            >
                                                {locations.map((location) => (
                                                    <MenuItem key={location} value={location}>
                                                        <Checkbox checked={selectedLocations.indexOf(location) > -1} />
                                                        <ListItemText primary={location} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {[
                                        { label: 'No of Max Men employees in SRR location', id: 'maxMenEmployees.srr', location: 'SRR location' },
                                        { label: 'No of Max Men employees in BGA location', id: 'maxMenEmployees.bga', location: 'BGA location' },
                                        { label: 'No of Max Men employees in Eco Space 2A&B location', id: 'maxMenEmployees.eco2AB', location: 'Eco Space 2A&B location' },
                                        { label: 'No of Max Men employees in Eco Space 4B location', id: 'maxMenEmployees.eco4B', location: 'Eco Space 4B location' },
                                        { label: 'No of Max Men employees in Electronic city location', id: 'maxMenEmployees.electronicCity', location: 'Electronic city location' },
                                        { label: 'No of Max Men employees in Hyderabad location', id: 'maxMenEmployees.hyderabad', location: 'Hyderabad location' },
                                        { label: 'No of Max women employees in SRR location', id: 'maxWomenEmployees.srr', location: 'SRR location' },
                                        { label: 'No of Max women employees in BGA location', id: 'maxWomenEmployees.bga', location: 'BGA location' },
                                        { label: 'No of Max women employees in Eco Space 2A&B location', id: 'maxWomenEmployees.eco2AB', location: 'Eco Space 2A&B location' },
                                        { label: 'No of Max women employees in Eco Space 4B location', id: 'maxWomenEmployees.eco4B', location: 'Eco Space 4B location' },
                                        { label: 'No of Max women employees in Electronic city location', id: 'maxWomenEmployees.electronicCity', location: 'Electronic city location' },
                                        { label: 'No of Max women employees in Hyderabad location', id: 'maxWomenEmployees.hyderabad', location: 'Hyderabad location' },
                                        { label: 'Total Employees in SRR location', id: 'totalEmployees.srr', location: 'SRR location' },
                                        { label: 'Total Employees in BGA location', id: 'totalEmployees.bga', location: 'BGA location' },
                                        { label: 'Total Employees in ECO space 2A&B location', id: 'totalEmployees.eco2AB', location: 'Eco Space 2A&B location' },
                                        { label: 'Total Employees in ECO space 4B location', id: 'totalEmployees.eco4B', location: 'Eco Space 4B location' },
                                        { label: 'Total Employees in Electronic city location', id: 'totalEmployees.electronicCity', location: 'Electronic city location' },
                                        { label: 'Total Employees in HYDERABAD location', id: 'totalEmployees.hyderabad', location: 'Hyderabad location' },
                                        { label: 'Latest No of Max Men employees in SRR location', id: 'latestMaxMenEmployees.srr', location: 'SRR location' },
                                        { label: 'Latest No of Max Men employees in BGA location', id: 'latestMaxMenEmployees.bga', location: 'BGA location' },
                                        { label: 'Latest No of Max Men employees in Eco Space 2A&B location', id: 'latestMaxMenEmployees.eco2AB', location: 'Eco Space 2A&B location' },
                                        { label: 'Latest No of Max Men employees in Eco Space 4B location', id: 'latestMaxMenEmployees.eco4B', location: 'Eco Space 4B location' },
                                        { label: 'Latest No of Max Men employees in Electronic city location', id: 'latestMaxMenEmployees.electronicCity', location: 'Electronic city location' },
                                        { label: 'Latest No of Max Men employees in Hyderabad location', id: 'latestMaxMenEmployees.hyderabad', location: 'Hyderabad location' },
                                        { label: 'Latest No of Max women employees in SRR location', id: 'latestMaxWomenEmployees.srr', location: 'SRR location' },
                                        { label: 'Latest No of Max women employees in BGA location', id: 'latestMaxWomenEmployees.bga', location: 'BGA location' },
                                        { label: 'Latest No of Max women employees in Eco Space 2A&B location', id: 'latestMaxWomenEmployees.eco2AB', location: 'Eco Space 2A&B location' },
                                        { label: 'Latest No of Max women employees in Eco Space 4B location', id: 'latestMaxWomenEmployees.eco4B', location: 'Eco Space 4B location' },
                                        { label: 'Latest No of Max women employees in Electronic city location', id: 'latestMaxWomenEmployees.electronicCity', location: 'Electronic city location' },
                                        { label: 'Latest No of Max women employees in Hyderabad location', id: 'latestMaxWomenEmployees.hyderabad', location: 'Hyderabad location' },
                                        { label: 'Latest No of Total Employees in SRR location', id: 'latestTotalEmployees.srr', location: 'SRR location' },
                                        { label: 'Latest No of Total Employees in BGA location', id: 'latestTotalEmployees.bga', location: 'BGA location' },
                                        { label: 'Latest No of Total Employees in ECO space 2A&B location', id: 'latestTotalEmployees.eco2AB', location: 'Eco Space 2A&B location' },
                                        { label: 'Latest No of Total Employees in ECO space 4B location', id: 'latestTotalEmployees.eco4B', location: 'Eco Space 4B location' },
                                        { label: 'Latest No of Total Employees in Electronic city location', id: 'latestTotalEmployees.electronicCity', location: 'Electronic city location' },
                                        { label: 'Latest No of Total Employees in HYDERABAD location', id: 'latestTotalEmployees.hyderabad', location: 'Hyderabad location' },
                                    ].map((field, index) => (
                                        isFieldVisible(field.location) && (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <FormControl fullWidth margin="normal" variant="outlined">
                                                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                                                    <Input
                                                        id={field.id}
                                                        value={formData[field.id.split('.')[0]]?.[field.id.split('.')[1]] || ''}
                                                        onChange={(event) => handleNestedInputChange(field.location, field.id.split('.')[0], event)}
                                                        aria-describedby={`${field.id}-helper-text`}
                                                    />
                                                    <FormHelperText id={`${field.id}-helper-text`}>Enter the {field.label.toLowerCase()}.</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        )
                                    ))}
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="userName">User Name</InputLabel>
                                            <Input
                                                id="userName"
                                                value={formData.userName}
                                                onChange={handleInputChange}
                                                aria-describedby="userName-helper-text"
                                            />
                                            <FormHelperText id="userName-helper-text">Enter the user name.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="uin">UIN</InputLabel>
                                            <Input
                                                id="uin"
                                                value={formData.uin}
                                                onChange={handleInputChange}
                                                aria-describedby="uin-helper-text"
                                            />
                                            <FormHelperText id="uin-helper-text">Enter the UIN.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="intelEntity">Intel Entity</InputLabel>
                                            <Input
                                                id="intelEntity"
                                                value={formData.intelEntity}
                                                onChange={handleInputChange}
                                                aria-describedby="intelEntity-helper-text"
                                            />
                                            <FormHelperText id="intelEntity-helper-text">Enter the Intel entity.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="contractorName">Name of the Contractor / Sub-contractor (Current name)</InputLabel>
                                            <Input
                                                id="contractorName"
                                                value={formData.contractorName}
                                                onChange={handleInputChange}
                                                aria-describedby="contractorName-helper-text"
                                            />
                                            <FormHelperText id="contractorName-helper-text">Enter the contractor's current name.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="contractorAddress">Address of the Contractor / Sub-contractor (Current Address)</InputLabel>
                                            <Input
                                                id="contractorAddress"
                                                value={formData.contractorAddress}
                                                onChange={handleInputChange}
                                                aria-describedby="contractorAddress-helper-text"
                                            />
                                            <FormHelperText id="contractorAddress-helper-text">Enter the contractor's current address.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="natureOfWork">Current Nature of work</InputLabel>
                                            <Input
                                                id="natureOfWork"
                                                value={formData.natureOfWork}
                                                onChange={handleInputChange}
                                                aria-describedby="natureOfWork-helper-text"
                                            />
                                            <FormHelperText id="natureOfWork-helper-text">Enter the current nature of work.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                                            <Input
                                                id="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleInputChange}
                                                aria-describedby="mobileNumber-helper-text"
                                            />
                                            <FormHelperText id="mobileNumber-helper-text">Enter the mobile number.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractStartDate"
                                            label="Period of Contract Start Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={formData.contractStartDate}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractEndDate"
                                            label="Contract End Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={formData.contractEndDate}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
                                Add CLRA Information
                            </Button>
                        </Box>
                    </StyledContainer>
                </ThemeProvider>
            </div>
        </Layout>
    );
};

export default CLRAForm;
