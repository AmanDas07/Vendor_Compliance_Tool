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
    MenuItem,
    Select,
    FormControlLabel,
    Checkbox
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

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const FormXXIV = () => {
    const [formData, setFormData] = useState({
        contractorName: '',
        contractorAddress: '',
        establishmentName: '',
        establishmentAddress: '',
        principalEmployerName: '',
        principalEmployerAddress: '',
        contractDurationFrom: '',
        contractDurationTo: '',
        daysPrincipalEmployerWorked: '',
        daysContractorWorked: '',
        maxMen: '',
        maxWomen: '',
        maxChildren: '',
        maxTotal: '',
        dailyHours: '',
        weeklyHoliday: '',
        weeklyHolidayPaid: false,
        overtimeHours: '',
        manDaysMen: '',
        manDaysWomen: '',
        manDaysChildren: '',
        manDaysTotal: '',
        wagesMen: '',
        wagesWomen: '',
        wagesChildren: '',
        wagesTotal: '',
        deductionsMen: '',
        deductionsWomen: '',
        deductionsChildren: '',
        deductionsTotal: '',
        canteen: false,
        restRooms: false,
        drinkingWater: false,
        creches: false,
        firstAid: false,
        date: getCurrentDate(),
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // You can add the logic to submit the form data to an API or any other handling
    };

    return (
        <Layout title="FORM – XXIV">
            <div style={{ marginBottom: '5px' }}>
                <ThemeProvider theme={theme}>
                    <StyledContainer>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'fantasy' }}>
                            FORM – XXIV
                        </Typography>
                        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <StyledPaper elevation={3}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractorName"
                                            label="Name of the Contractor"
                                            name="contractorName"
                                            value={formData.contractorName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractorAddress"
                                            label="Address of the Contractor"
                                            name="contractorAddress"
                                            value={formData.contractorAddress}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="establishmentName"
                                            label="Name of the Establishment"
                                            name="establishmentName"
                                            value={formData.establishmentName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="establishmentAddress"
                                            label="Address of the Establishment"
                                            name="establishmentAddress"
                                            value={formData.establishmentAddress}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="principalEmployerName"
                                            label="Name of the Principal Employer"
                                            name="principalEmployerName"
                                            value={formData.principalEmployerName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="principalEmployerAddress"
                                            label="Address of the Principal Employer"
                                            name="principalEmployerAddress"
                                            value={formData.principalEmployerAddress}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractDurationFrom"
                                            label="Contract Duration From"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            name="contractDurationFrom"
                                            value={formData.contractDurationFrom}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractDurationTo"
                                            label="Contract Duration To"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            name="contractDurationTo"
                                            value={formData.contractDurationTo}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="daysPrincipalEmployerWorked"
                                            label="Days Principal Employer Worked"
                                            name="daysPrincipalEmployerWorked"
                                            value={formData.daysPrincipalEmployerWorked}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="daysContractorWorked"
                                            label="Days Contractor Worked"
                                            name="daysContractorWorked"
                                            value={formData.daysContractorWorked}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Maximum number of contract labour employed on any day during the half year:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="maxMen"
                                            label="Men"
                                            name="maxMen"
                                            value={formData.maxMen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="maxWomen"
                                            label="Women"
                                            name="maxWomen"
                                            value={formData.maxWomen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="maxChildren"
                                            label="Children"
                                            name="maxChildren"
                                            value={formData.maxChildren}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="maxTotal"
                                            label="Total"
                                            name="maxTotal"
                                            value={formData.maxTotal}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="dailyHours"
                                            label="Daily hours of work and spread over"
                                            name="dailyHours"
                                            value={formData.dailyHours}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="weeklyHoliday"
                                            label="Weekly holidays observed and on what day"
                                            name="weeklyHoliday"
                                            value={formData.weeklyHoliday}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.weeklyHolidayPaid}
                                                    onChange={handleCheckboxChange}
                                                    name="weeklyHolidayPaid"
                                                    color="primary"
                                                />
                                            }
                                            label="Was it paid for?"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="overtimeHours"
                                            label="No. of man-hours of overtime worked"
                                            name="overtimeHours"
                                            value={formData.overtimeHours}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Number of man-days worked by:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="manDaysMen"
                                            label="Men"
                                            name="manDaysMen"
                                            value={formData.manDaysMen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="manDaysWomen"
                                            label="Women"
                                            name="manDaysWomen"
                                            value={formData.manDaysWomen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="manDaysChildren"
                                            label="Children"
                                            name="manDaysChildren"
                                            value={formData.manDaysChildren}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="manDaysTotal"
                                            label="Total"
                                            name="manDaysTotal"
                                            value={formData.manDaysTotal}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Amount of wages paid:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="wagesMen"
                                            label="Men"
                                            name="wagesMen"
                                            value={formData.wagesMen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="wagesWomen"
                                            label="Women"
                                            name="wagesWomen"
                                            value={formData.wagesWomen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="wagesChildren"
                                            label="Children"
                                            name="wagesChildren"
                                            value={formData.wagesChildren}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="wagesTotal"
                                            label="Total"
                                            name="wagesTotal"
                                            value={formData.wagesTotal}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Amount of deduction from wages, if any:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="deductionsMen"
                                            label="Men"
                                            name="deductionsMen"
                                            value={formData.deductionsMen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="deductionsWomen"
                                            label="Women"
                                            name="deductionsWomen"
                                            value={formData.deductionsWomen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="deductionsChildren"
                                            label="Children"
                                            name="deductionsChildren"
                                            value={formData.deductionsChildren}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="deductionsTotal"
                                            label="Total"
                                            name="deductionsTotal"
                                            value={formData.deductionsTotal}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Whether the following have been provided:</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.canteen}
                                                    onChange={handleCheckboxChange}
                                                    name="canteen"
                                                    color="primary"
                                                />
                                            }
                                            label="Canteen"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.restRooms}
                                                    onChange={handleCheckboxChange}
                                                    name="restRooms"
                                                    color="primary"
                                                />
                                            }
                                            label="Rest Rooms"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.drinkingWater}
                                                    onChange={handleCheckboxChange}
                                                    name="drinkingWater"
                                                    color="primary"
                                                />
                                            }
                                            label="Drinking Water"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.creches}
                                                    onChange={handleCheckboxChange}
                                                    name="creches"
                                                    color="primary"
                                                />
                                            }
                                            label="Creches"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.firstAid}
                                                    onChange={handleCheckboxChange}
                                                    name="firstAid"
                                                    color="primary"
                                                />
                                            }
                                            label="First Aid"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="date"
                                            label="Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
                                Submit Form
                            </Button>
                        </Box>
                    </StyledContainer>
                </ThemeProvider>
            </div>
        </Layout>
    );
};

export default FormXXIV;
