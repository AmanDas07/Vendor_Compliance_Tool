import Layout from "../Layout";
import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    Button,
    Box,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Tooltip,
    Typography,
    IconButton,
    Select,
    InputLabel,
    FormControl,
    Chip,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import { FilterList, Search, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
    textTransform: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1, 0),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid #ddd',
    '&:not(:last-child)': {
        borderRight: '1px solid #ddd',
    },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '& .MuiTableCell-head': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
        borderBottom: '1px solid #ddd',
        '&:not(:last-child)': {
            borderRight: '1px solid #ddd',
        },
    },
}));

const options = {
    companies: ['Company A', 'Company B', 'Company C'],
    states: ['Location A', 'State Y', 'State Z'],
    lawAreas: ['Law Area A', 'Law Area 2', 'Law Area 3'],
    actRules: ['Act A', 'Act/Rule 2', 'Act/Rule 3'],
    periodicities: ['Annual', 'Monthly', 'Weekly'],
    status: ['All', 'Open', 'Pending for Discrepancy', 'Pending for Review'],
    searchFields: ['UIN', 'Location', 'Compliance Activity', 'Law Area', 'Act or Rule', 'Risk', 'Form', 'Consequence', 'Status']
};

const Trackers = () => {
    const [selections, setSelections] = useState({
        company: '',
        state: [],
        lawArea: [],
        actRule: [],
        periodicity: [],
        status: [],
        startDate: '',
        endDate: '',
    });

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchField, setSearchField] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSelectionChange = (field) => (event) => {
        setSelections({
            ...selections,
            [field]: event.target.value,
        });
    };

    useEffect(() => {
        console.log('Filtered Data:', filteredData);
    }, [filteredData]);

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Selections state before API request:', selections); // Debug log
        try {
            const { data } = await axios.post(`http://localhost:8080/api/v1/tracker/get-trackers`, selections);
            setData(data);
            setFilteredData(data); // Initialize filteredData with all data
        } catch (error) {
            console.log('API request error:', error);
        }
    };

    const handleSearch = () => {
        if (searchField && searchValue) {
            const filtered = data.filter((row) => {
                const fieldValue = row[searchField.replace(/ /g, '').toLowerCase()];
                return fieldValue && fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClear = () => {
        setSelections({
            company: '',
            state: [],
            lawArea: [],
            actRule: [],
            periodicity: [],
            status: [],
            startDate: '',
            endDate: '',
        });
        setData([]);
        setFilteredData([]);
    };

    const handleEdit = async (uin) => {
        navigate(`/Edit/${uin}`);
    };

    return (
        <Layout title="All Trackers">
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h6">All Trackers</Typography>
                        <Tooltip title="Filter List">
                            <FilterList sx={{ ml: 2, color: theme.palette.primary.main }} />
                        </Tooltip>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <StyledTextField
                                    label="Company"
                                    variant="outlined"
                                    select
                                    value={selections.company}
                                    onChange={handleSelectionChange('company')}
                                    fullWidth
                                >
                                    {options.companies.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormControl fullWidth>
                                    <InputLabel>State</InputLabel>
                                    <Select
                                        label="State"
                                        variant="outlined"
                                        multiple
                                        value={selections.state}
                                        onChange={handleSelectionChange('state')}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {options.states.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        label="Status"
                                        variant="outlined"
                                        multiple
                                        value={selections.status}
                                        onChange={handleSelectionChange('status')}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {options.status.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Act/Rule</InputLabel>
                                    <Select
                                        label="Act/Rule"
                                        variant="outlined"
                                        multiple
                                        value={selections.actRule}
                                        onChange={handleSelectionChange('actRule')}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {options.actRules.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Periodicity</InputLabel>
                                    <Select
                                        label="Periodicity"
                                        variant="outlined"
                                        multiple
                                        value={selections.periodicity}
                                        onChange={handleSelectionChange('periodicity')}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {options.periodicities.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <StyledTextField
                                    label="Start Due Date"
                                    type="date"
                                    variant="outlined"
                                    value={selections.startDate}
                                    onChange={handleSelectionChange('startDate')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <StyledTextField
                                    label="End Due Date"
                                    type="date"
                                    variant="outlined"
                                    value={selections.endDate}
                                    onChange={handleSelectionChange('endDate')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end">
                                    <StyledButton variant="contained" color="primary" type="submit" startIcon={<Search />}>
                                        Apply
                                    </StyledButton>
                                    <StyledButton variant="outlined" color="primary" sx={{ ml: 2 }} onClick={handleClear}>
                                        Clear
                                    </StyledButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                    <Box display="flex" alignItems="center" mt={4} mb={2}>
                        <FormControl sx={{ mr: 2, minWidth: 120 }}>
                            <InputLabel>Search Field</InputLabel>
                            <Select
                                value={searchField}
                                onChange={handleSearchFieldChange}
                                label="Search Field"
                            >
                                {options.searchFields.map((field) => (
                                    <MenuItem key={field} value={field}>
                                        {field}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Search Value"
                            variant="outlined"
                            value={searchValue}
                            onChange={handleSearchValueChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            startIcon={<Search />}
                            sx={{ ml: 2 }}
                        >
                            Search
                        </Button>
                    </Box>
                    <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 1 }}>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <StyledTableCell>UIN</StyledTableCell>
                                    <StyledTableCell>Location</StyledTableCell>
                                    <StyledTableCell>Compliance Activity</StyledTableCell>
                                    <StyledTableCell>Law Area</StyledTableCell>
                                    <StyledTableCell>Act or Rule</StyledTableCell>
                                    <StyledTableCell>Due Date</StyledTableCell>
                                    <StyledTableCell>Risk</StyledTableCell>
                                    <StyledTableCell>Form</StyledTableCell>
                                    <StyledTableCell>Consequence</StyledTableCell>
                                    <StyledTableCell>Proof</StyledTableCell>
                                    <StyledTableCell>Status</StyledTableCell>
                                    <StyledTableCell>Details</StyledTableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {filteredData != null && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.uniqueIdentifier}>
                                        <StyledTableCell>{row.uniqueIdentifier}</StyledTableCell>
                                        <StyledTableCell>{row.location}</StyledTableCell>
                                        <StyledTableCell>{row.complianceActivity}</StyledTableCell>
                                        <StyledTableCell>{row.lawArea}</StyledTableCell>
                                        <StyledTableCell>{row.actOrRule}</StyledTableCell>
                                        <StyledTableCell>{new Date(row.dueDate).toLocaleDateString()}</StyledTableCell>
                                        <StyledTableCell>{row.risk}</StyledTableCell>
                                        <StyledTableCell>{row.form}</StyledTableCell>
                                        <StyledTableCell>{row.consequence}</StyledTableCell>
                                        <StyledTableCell>{row.proof ? 'Yes' : 'No'}</StyledTableCell>
                                        <StyledTableCell>{row.status}</StyledTableCell>
                                        <StyledTableCell>
                                            <Tooltip title="Edit Detail">
                                                <IconButton size="small" color="primary" onClick={() => {
                                                    const UIN = JSON.stringify(row.uniqueIdentifier).replace(/"/g, '');
                                                    handleEdit(UIN);
                                                }}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </StyledContainer>
            </ThemeProvider>
        </Layout>
    );
};

export default Trackers;
