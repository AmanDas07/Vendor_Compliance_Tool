import React, { useEffect, useState } from 'react';
import {
    Container,
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
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Card,
    CardContent,
    Avatar,
    Grid,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import { Edit, Search, FilterList, AssignmentTurnedIn, Pending, ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/userContext.js";
import Layout from '../Layout.js';

const theme = createTheme({
    palette: {
        primary: {
            main: '#05072E', // Updated to #05072E
        },
        secondary: {
            main: '#6f74dd', // A lighter, complementary color for accents
        },
        success: {
            main: '#66bb6a',
        },
        warning: {
            main: '#ffa726',
        },
        error: {
            main: '#e64a19',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        h6: {
            fontWeight: 600,
        },
        h7: {
            fontSize: '1rem',
            fontWeight: 400,
        }
    },
});

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    transition: 'transform 0.5s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
    },
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

const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: 250,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[5],
    borderRadius: '15px',
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const ManagerDashboard = () => {
    const [{ user }] = useAuth();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchField, setSearchField] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [filters, setFilters] = useState({
        company: user?.company || '',
        location: '',
        lawArea: '',
        actOrRule: '',
        status: '',
        startDate: '',
        endDate: '',
    });
    const navigate = useNavigate();

    const fetchTrackers = async (filterParams) => {
        try {
            const { data } = await axios.post(`http://localhost:8082/api/v1/tracker/get-trackers`, {
                company: user?.company,
                status: ['Open', 'Pending'],
                periodicity: ['Annual', 'Monthly', 'Weekly', 'Other'],
                ...filterParams // Apply the filter parameters here
            });
            setData(data);
            setFilteredData(data);
        } catch (error) {
            console.log('API request error:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTrackers({});
        }
    }, [user]);

    const handleEdit = (uin) => {
        navigate(`/Edit/${uin}`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
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

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterApply = () => {
        const filterParams = {
            location: filters.location || undefined,
            lawArea: filters.lawArea || undefined,
            actOrRule: filters.actOrRule || undefined,
            status: filters.status || undefined,
            startDate: filters.startDate || undefined,
            endDate: filters.endDate || undefined,
        };

        fetchTrackers(filterParams);
        setFilterDialogOpen(false);
    };

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    {/* Header Section with Filter Button */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography sx={{ fontFamily: "sans-serif", color: theme.palette.primary.main, fontWeight: '700' }} variant="h3" gutterBottom >
                            My Tasks
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<FilterList />}
                            onClick={() => setFilterDialogOpen(true)}
                        >
                            Change Filter
                        </Button>
                    </Box>

                    {/* Cards Section for Key Metrics */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                                            <AssignmentTurnedIn />
                                        </Avatar>
                                        <Box ml={2}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Completed Tasks</Typography>
                                            <Typography variant="body2">27 Completed</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                                            <Pending />
                                        </Avatar>
                                        <Box ml={2}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Pending Reviews</Typography>
                                            <Typography variant="body2">15 Pending</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StyledCard>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                                            <ErrorOutline />
                                        </Avatar>
                                        <Box ml={2}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Overdue Tasks</Typography>
                                            <Typography variant="body2">8 Overdue</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>

                    {/* Search Functionality */}
                    <Box display="flex" alignItems="center" mb={4} mt={2} sx={{ backgroundColor: '#e3f2fd', padding: theme.spacing(2), borderRadius: '8px' }}>
                        <FormControl sx={{ mr: 2, minWidth: 120 }}>
                            <Select
                                value={searchField}
                                onChange={handleSearchFieldChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Field</MenuItem>
                                <MenuItem value="uin">UIN</MenuItem>
                                <MenuItem value="location">Location</MenuItem>
                                <MenuItem value="complianceActivity">Compliance Activity</MenuItem>
                                <MenuItem value="lawArea">Law Area</MenuItem>
                                <MenuItem value="actOrRule">Act or Rule</MenuItem>
                                <MenuItem value="risk">Risk</MenuItem>
                                <MenuItem value="form">Form</MenuItem>
                                <MenuItem value="consequence">Consequence</MenuItem>
                                <MenuItem value="status">Status</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Search Value"
                            variant="outlined"
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            fullWidth
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

                    {/* Table of Trackers */}
                    <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 1, boxShadow: theme.shadows[3], transition: 'transform 0.5s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.01)', boxShadow: theme.shadows[6] } }}>
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
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.uniqueIdentifier} sx={{ transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                        <StyledTableCell>{row.uniqueIdentifier}</StyledTableCell>
                                        <StyledTableCell>{row.location}</StyledTableCell>
                                        <StyledTableCell>{row.complianceActivity}</StyledTableCell>
                                        <StyledTableCell>{row.lawArea}</StyledTableCell>
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

                {/* Filter Modal */}
                <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Change Filters</DialogTitle>
                    <DialogContent>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Company"
                                value={filters.company}
                                name="company"
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="Location"
                                value={filters.location}
                                name="location"
                                onChange={handleFilterChange}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                label="Law Area"
                                value={filters.lawArea}
                                name="lawArea"
                                onChange={handleFilterChange}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                label="Act or Rule"
                                value={filters.actOrRule}
                                name="actOrRule"
                                onChange={handleFilterChange}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                label="Status"
                                value={filters.status}
                                name="status"
                                onChange={handleFilterChange}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                label="Start Date"
                                type="date"
                                value={filters.startDate}
                                name="startDate"
                                onChange={handleFilterChange}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                value={filters.endDate}
                                name="endDate"
                                onChange={handleFilterChange}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setFilterDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFilterApply} color="primary" variant="contained">
                            Apply Filters
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </Layout>
    );
};

export default ManagerDashboard;
