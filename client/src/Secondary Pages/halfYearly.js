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
    Select,
    MenuItem,
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

const initialState = {
    vendorName: '',
    vendorAddress: '',
    natureOfService: '',
    halfYear: '',
    intelPremises: {
        SRR: false,
        ITT1: false,
        BGA: false,
        IMB: false,
        EMB1: false,
        HYD: false,
        CtrlS: false,
    },
    employeesCount: {
        SRR: '',
        ITT1: '',
        BGA: '',
        IMB: '',
        EMB1: '',
        HYD: '',
        ECO: '',
        CtrlS: '',
    },
    contractLabourAct: {
        registered: false,
        salaryDisbursed: false,
        registerMaintained: false,
        comments: '',
    },
    interstateMigrantAct: {
        registered: false,
        comments: '',
    },
    esiAct: {
        registered: false,
        contributionsMade: false,
        comments: '',
    },
};

const ComplianceCertificateForm = () => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const [section, field] = name.split('.');
        if (section && field) {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [field]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const [section, field] = name.split('.');
        if (section && field) {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [field]: checked,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: checked,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // Add logic to submit form data to the server or handle it accordingly
    };

    return (
        <Layout title="Half Yearly Compliance Certificate">
            <div style={{ marginBottom: '5px' }}>
                <ThemeProvider theme={theme}>
                    <StyledContainer>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'fantasy' }}>
                            Half Yearly Compliance Certificate
                        </Typography>
                        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <StyledPaper elevation={3}>
                                <Typography variant="h6" gutterBottom>
                                    Vendor check list
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="vendorName"
                                            label="Vendor Name"
                                            name="vendorName"
                                            value={formData.vendorName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="vendorAddress"
                                            label="Vendor's registered office address"
                                            name="vendorAddress"
                                            value={formData.vendorAddress}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="natureOfService"
                                            label="Nature of service offered"
                                            name="natureOfService"
                                            value={formData.natureOfService}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth margin="normal" variant="outlined">
                                            <InputLabel htmlFor="halfYear">Select the appropriate Half year</InputLabel>
                                            <Select
                                                id="halfYear"
                                                name="halfYear"
                                                value={formData.halfYear}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value="H1">H1 (January 1 to June 30)</MenuItem>
                                                <MenuItem value="H2">H2 (July 1 to December 31)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Intel premises</Typography>
                                        {Object.keys(formData.intelPremises).map((premise) => (
                                            <FormControlLabel
                                                key={premise}
                                                control={
                                                    <Checkbox
                                                        checked={formData.intelPremises[premise]}
                                                        onChange={handleCheckboxChange}
                                                        name={`intelPremises.${premise}`}
                                                        color="primary"
                                                    />
                                                }
                                                label={premise}
                                            />
                                        ))}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Total number of employees employed at Intel Premises</Typography>
                                    </Grid>
                                    {Object.keys(formData.employeesCount).map((premise) => (
                                        <Grid item xs={12} sm={6} key={premise}>
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                id={`employeesCount.${premise}`}
                                                label={premise}
                                                name={`employeesCount.${premise}`}
                                                value={formData.employeesCount[premise]}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    ))}
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Contract Labour (Regulation & Abolition) Act, 1970</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.contractLabourAct.registered}
                                                    onChange={handleCheckboxChange}
                                                    name="contractLabourAct.registered"
                                                    color="primary"
                                                />
                                            }
                                            label="Is the vendor registered under the provisions of this Act?"
                                        />
                                        {formData.contractLabourAct.registered && (
                                            <Typography variant="body2">Attach a copy of the renewed License/Application for renewal as Annex-1 and a copy of Half Yearly Return in Form XXIV as Annex-2</Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.contractLabourAct.salaryDisbursed}
                                                    onChange={handleCheckboxChange}
                                                    name="contractLabourAct.salaryDisbursed"
                                                    color="primary"
                                                />
                                            }
                                            label="Whether the salary to the contract labour engaged by the vendor in the premises for Intel has been disbursed on or before 7th of every month for the select aforesaid period"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.contractLabourAct.registerMaintained}
                                                    onChange={handleCheckboxChange}
                                                    name="contractLabourAct.registerMaintained"
                                                    color="primary"
                                                />
                                            }
                                            label="Whether the vendor has maintained and updated the register in Form XVII?"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="contractLabourAct.comments"
                                            label="Comments (if any)"
                                            name="contractLabourAct.comments"
                                            value={formData.contractLabourAct.comments}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Interstate Migrant Workmen (Regulation of Employment and Conditions of Service) Act, 1979</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.interstateMigrantAct.registered}
                                                    onChange={handleCheckboxChange}
                                                    name="interstateMigrantAct.registered"
                                                    color="primary"
                                                />
                                            }
                                            label="Is the vendor registered under the provisions of this Act?"
                                        />
                                        {formData.interstateMigrantAct.registered && (
                                            <Typography variant="body2">Attach a copy of the registration certificate as Annex-3</Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="interstateMigrantAct.comments"
                                            label="Comments (if any)"
                                            name="interstateMigrantAct.comments"
                                            value={formData.interstateMigrantAct.comments}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Employees' State Insurance Act, 1948 ("ESI Act")</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.esiAct.registered}
                                                    onChange={handleCheckboxChange}
                                                    name="esiAct.registered"
                                                    color="primary"
                                                />
                                            }
                                            label="Is the vendor registered under the provisions of this Act?"
                                        />
                                        {formData.esiAct.registered && (
                                            <Typography variant="body2">Attach a copy of the registration certificate as Annex-4</Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.esiAct.contributionsMade}
                                                    onChange={handleCheckboxChange}
                                                    name="esiAct.contributionsMade"
                                                    color="primary"
                                                />
                                            }
                                            label="Whether the vendor made the requisite contributions during the aforesaid period"
                                        />
                                        {formData.esiAct.contributionsMade && (
                                            <Typography variant="body2">Attach a copy of the challans for the aforesaid period as Annex-5</Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            id="esiAct.comments"
                                            label="Comments (if any)"
                                            name="esiAct.comments"
                                            value={formData.esiAct.comments}
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

export default ComplianceCertificateForm;
