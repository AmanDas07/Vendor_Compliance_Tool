import React from 'react';
import {
    Container,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    ListItemText,
    ListItemIcon,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PolicyIcon from '@mui/icons-material/Policy';
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
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));

const currentYear = new Date().getFullYear();

const months = [
    `January ${currentYear}`,
    `February ${currentYear}`,
    `March ${currentYear}`,
    `April ${currentYear}`,
    `May ${currentYear}`,
    `June ${currentYear}`,
    `July ${currentYear}`,
    `August ${currentYear}`,
    `September ${currentYear}`,
    `October ${currentYear}`,
    `November ${currentYear}`,
    `December ${currentYear}`,
];

const complianceCategories = [
    { name: 'EPF (Monthly)', icon: <WorkIcon /> },
    { name: 'ESIC', icon: <LocalHospitalIcon /> },
    { name: 'LWF', icon: <PeopleIcon /> },
    { name: 'PTAX', icon: <GavelIcon /> },
    { name: 'POSH', icon: <PolicyIcon /> },
    { name: 'CLRA', icon: <AssignmentTurnedInIcon /> },
    { name: 'INTERSTATE MIGRANT WORKERS', icon: <EngineeringIcon /> },
    { name: 'Contract labour Form 14 and 17', icon: <DescriptionIcon /> },
];

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 200,
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-root': {
        color: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
        },
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    '& .MuiListItemIcon-root': {
        minWidth: theme.spacing(4),
    },
    '& .MuiTypography-root': {
        marginLeft: theme.spacing(1),
    },
}));

const Workspace = () => {
    return (
        <Layout title="Compliance Workspace">
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                        Compliance Categories
                    </Typography>
                    <Grid container spacing={3} direction="column">
                        {complianceCategories.map((category) => (
                            <Grid item xs={12} key={category.name}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`${category.name}-content`}
                                        id={`${category.name}-header`}
                                    >
                                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                            {category.icon}
                                            <Box component="span" sx={{ marginLeft: 1 }}>
                                                {category.name}
                                            </Box>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <StyledFormControl fullWidth variant="outlined">
                                            <InputLabel>{category.name}</InputLabel>
                                            <Select label={category.name}>
                                                {months.map((month) => (
                                                    <StyledMenuItem value={month} key={month}>
                                                        <ListItemIcon>{category.icon}</ListItemIcon>
                                                        <ListItemText primary={month} />
                                                    </StyledMenuItem>
                                                ))}
                                            </Select>
                                        </StyledFormControl>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))}
                    </Grid>
                </StyledContainer>
            </ThemeProvider>
        </Layout>
    );
};

export default Workspace;
