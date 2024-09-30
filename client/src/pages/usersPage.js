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
} from '@mui/material';
import { FilterList, Edit } from '@mui/icons-material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#f44336',
        },
    },
    typography: {
        h6: {
            fontWeight: 600,
        },
        body2: {
            color: '#ffffff',
        },
    },
});

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    background: 'linear-gradient(90deg, rgba(5,7,46,1) 0%, rgba(36,37,65,1) 100%)',
    color: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: 'rgba(36,37,65,1)',
    '& .MuiTableCell-head': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
}));

const Trackers = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filters, setFilters] = useState({
        company: '',
        location: '',
        lawarea: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data initially and set state
        axios.get('/api/trackers').then((response) => {
            setData(response.data);
            setFilteredData(response.data);
        });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleFilterSubmit = () => {
        const filtered = data.filter(
            (row) =>
                (filters.company ? row.company === filters.company : true) &&
                (filters.location ? row.location === filters.location : true) &&
                (filters.lawarea ? row.lawarea.includes(filters.lawarea) : true)
        );
        setFilteredData(filtered);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Manage Users
                        </Typography>
                        <Tooltip title="Filter List">
                            <FilterList sx={{ ml: 2, cursor: 'pointer', color: '#ffffff' }} />
                        </Tooltip>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#ffffff' }}>Company</InputLabel>
                                <Select
                                    value={filters.company}
                                    onChange={handleFilterChange}
                                    name="company"
                                    label="Company"
                                    sx={{ color: '#ffffff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' } }}
                                >
                                    <MenuItem value="Kotak Securities Limited">
                                        Kotak Securities Limited
                                    </MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#ffffff' }}>Location</InputLabel>
                                <Select
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    name="location"
                                    label="Location"
                                    sx={{ color: '#ffffff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' } }}
                                >
                                    <MenuItem value="KSL-Mumbai-Corporate Office">
                                        KSL-Mumbai-Corporate Office
                                    </MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: '#ffffff' }}>Lawarea</InputLabel>
                                <Select
                                    value={filters.lawarea}
                                    onChange={handleFilterChange}
                                    name="lawarea"
                                    label="Lawarea"
                                    sx={{ color: '#ffffff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' } }}
                                >
                                    <MenuItem value="Internal Requirement">
                                        Internal Requirement
                                    </MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFilterSubmit}
                                sx={{ mt: 2 }}
                            >
                                Apply Filters
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>E-mail</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Lawarea</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: 'rgba(5,7,46,0.1)' } }}>
                                            <TableCell>{row.firstName}</TableCell>
                                            <TableCell>{row.lastName}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.location}</TableCell>
                                            <TableCell>{row.lawarea.join(', ')}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => navigate(`/edit/${row.id}`)}
                                                        size="small"
                                                        color="primary"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
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
