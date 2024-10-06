import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
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
    IconButton,
    Select,
    FormControl,
    InputLabel,
    Typography,
    TextField,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { FilterList, Edit, Add, Search } from '@mui/icons-material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import api from '../api';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
        },
    },
    typography: {
        h6: {
            fontWeight: 600,
        },
        body2: {
            color: '#333333',
        },
    },
});

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '& .MuiTableCell-head': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
}));

const Users = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filters, setFilters] = useState({
        company: '',
        location: [],
        lawarea: '',
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [companies, setCompanies] = useState([]);
    const [lawAreas, setLawAreas] = useState([]);
    const [locations, setLocations] = useState([]);
    const [vendors, setVendors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfoAndUsers = async () => {
            try {
                const { data } = await api.get('http://localhost:3001/api/v1/detail/userinfo');
                setCompanies([data.companyDetails.company_name]);
                setLocations(data.companyDetails.locations);
                setVendors(data.companyDetails.vendors || []);
                if (data.companyDetails.company_name) {
                    const response = await api.post('http://localhost:3001/api/v1/detail/Users', {
                        company: data.companyDetails.company_name,
                    });
                    setData(response.data);
                    setFilteredData(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchUserInfoAndUsers();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'location') {
            if (value.includes('All')) {
                setFilters({
                    ...filters,
                    location: filters.location.length === locations.length ? [] : locations,
                });
            } else {
                setFilters({
                    ...filters,
                    [name]: value,
                });
            }
        } else {
            setFilters({
                ...filters,
                [name]: value,
            });
        }
    };

    const handleFilterSubmit = async () => {
        try {
            const response = await api.post('http://localhost:3001/api/v1/detail/Users', {
                company: filters.company,
                location: filters.location,
                lawarea: filters.lawarea,
            });
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching filtered data:", error);
        }
    };

    const handleClearFilters = () => {
        setFilters({
            company: '',
            location: [],
            lawarea: '',
        });
        setSearchQuery("");
        setFilteredData([]);
    };

    const handleExport = () => {
        console.log('Exporting data...');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" color="primary">
                            Manage Users
                        </Typography>
                        <Tooltip title="Filter List">
                            <IconButton color="primary">
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* Filters and Submit Button */}
                    <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Company Dropdown */}
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Company</InputLabel>
                                <Select
                                    value={filters.company}
                                    onChange={handleFilterChange}
                                    name="company"
                                    label="Company"
                                >
                                    {companies.map((company, index) => (
                                        <MenuItem key={index} value={company}>
                                            {company}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Location Dropdown */}
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Location</InputLabel>
                                <Select
                                    multiple
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    name="location"
                                    label="Location"
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="All">
                                        <Checkbox checked={filters.location.length === locations.length} />
                                        <ListItemText primary="All" />
                                    </MenuItem>
                                    {locations.map((location, index) => (
                                        <MenuItem key={index} value={location}>
                                            <Checkbox checked={filters.location.indexOf(location) > -1} />
                                            <ListItemText primary={location} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Vendors Dropdown */}
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Vendors</InputLabel>
                                <Select
                                    value={filters.lawarea}
                                    onChange={handleFilterChange}
                                    name="lawarea"
                                    label="Vendors"
                                >
                                    {vendors.map((vendor, index) => (
                                        <MenuItem key={index} value={vendor}>
                                            {vendor}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} md={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFilterSubmit}
                                sx={{ mt: 1.5 }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Search field and Search button */}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                        <TextField
                            sx={{ width: '100vh' }}
                            variant="outlined"
                            label="Search by First or Last Name"
                            value={searchQuery}
                            onChange={handleSearch}
                            InputProps={{
                                endAdornment: (
                                    <Search color="primary" />
                                ),
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={handleFilterSubmit}>
                            Search
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
                            Clear
                        </Button>
                    </Grid>


                    {/* Button Group */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={() => navigate('/add_user')}
                        >
                            New User
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleExport}>
                            Export
                        </Button>
                    </Grid>

                    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>E-mail</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const [firstName, ...lastName] = row.name.split(' ');
                                        return (
                                            <TableRow key={row.id} hover>
                                                <TableCell>{firstName}</TableCell>
                                                <TableCell>{lastName.join(' ')}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.location}</TableCell>
                                                <TableCell>{row.role}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            onClick={() => navigate(`/edit-user/${row._id}`)}
                                                            size="small"
                                                            color="primary"
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
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

export default Users;
