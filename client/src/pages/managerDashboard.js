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
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/userContext.js";
import Layout from '../Layout.js';

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
        h7: {
            fontSize: '1rem',
            fontWeight: 400,
        }
    },
});

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
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

const ManagerDashboard = () => {
    const [{ user }] = useAuth();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                const { data } = await axios.post(`http://localhost:8082/api/v1/tracker/get-trackers`, {
                    company: user?.company,
                    status: ['Open', 'Pending'],
                    periodicity: ['Annual', 'Monthly', 'Weekly', 'Other'],
                    startDate: '',
                    endDate: ''
                });
                setData(data);
            } catch (error) {
                console.log('API request error:', error);
            }
        };

        if (user) {
            fetchTrackers();
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

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <StyledContainer>
                    <Typography sx={{ fontFamily: "sans-serif", color: 'darkblue', mb: 2 }} variant="h3" gutterBottom >
                        My Tasks
                    </Typography>



                    <TableContainer component={Paper}>
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
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                            count={data.length}
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

export default ManagerDashboard;
