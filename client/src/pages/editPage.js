import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    TextField,
    Typography,
    Button,
    Box,
    Paper,
    Grid,
    IconButton,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TablePagination,
    Input,
    FormControl,
    InputLabel,
    InputAdornment
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import Layout from '../Layout';
import { styled } from '@mui/material/styles';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '& .MuiTableCell-head': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
}));

const EditPage = () => {
    const { uin } = useParams();
    const [data, setData] = useState(null);
    const [formState, setFormState] = useState({
        complianceActivity: '',
        description: '',
        category: '',
        actOrRule: '',
        lawArea: '',
        sectionDesc: '',
        sourceURL: '',
        periodicity: '',
        periodicityDueDate: '',
        form: '',
        consequence: '',
        risk: '',
        dueDate: '',
        completionDate: '',
        status: '',
        proofNotRequired: false,
    });

    const [editFields, setEditFields] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:8082/api/v1/tracker/get_tracker/${uin}`);
            setData(data);
            setFormState({
                complianceActivity: data[0].complianceActivity,
                description: data[0].description,
                category: data[0].category,
                actOrRule: data[0].actOrRule,
                lawArea: data[0].lawArea,
                sectionDesc: data[0].sectionDesc,
                sourceURL: data[0].sourceURL,
                periodicity: data[0].periodicity,
                periodicityDueDate: data[0].periodicityDueDate,
                form: data[0].form,
                consequence: data[0].consequence,
                risk: data[0].risk,
                dueDate: data[0].dueDate.split('T')[0],  
                completionDate: data[0].completionDate.split('T')[0],  
                status: data[0].status,
                proofNotRequired: data[0].proofNotRequired,
            });
        };
        fetchData();
    }, [uin]);

    const handleEditClick = (field) => {
        setEditFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async (field) => {
        try {
            const updatedField = { [field]: formState[field] };
            const response = await axios.post(`http://localhost:8080/api/v1/tracker/update_tracker/${uin}`, updatedField);
            console.log('Update response:', response.data);
            setEditFields((prev) => ({
                ...prev,
                [field]: false,
            }));
        } catch (error) {
            console.log('Update error:', error);
        }
    };

    const handleAdd = (section) => {
        console.log(`Add button clicked for section: ${section}`);
        // Add your add logic here
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/tracker/upload_proof/${uin}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File upload response:', response.data);
        } catch (error) {
            console.log('File upload error:', error);
        }
    };

    return (
        <Layout>
            <Container component={Paper} sx={{ backgroundColor: 'white', padding: 4, mt: 4, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Edit Tracker
                </Typography>
                {data ? (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
                                <CardHeader title="Current Data" sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }} />
                                <CardContent>
                                    {Object.keys(formState).map((key) => (
                                        <Box key={key} mb={3}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                                            </Typography>
                                            <Typography variant="body1" display="inline">
                                                {key === 'sourceURL' ? (
                                                    <a href={formState[key]} target="_blank" rel="noopener noreferrer">
                                                        {formState[key]}
                                                    </a>
                                                ) : key === 'proofNotRequired' ? (
                                                    formState[key] ? 'Yes' : 'No'
                                                ) : (
                                                    formState[key]
                                                )}
                                                {key !== 'dueDate' && key !== 'completionDate' && (
                                                    <IconButton onClick={() => handleEditClick(key)} sx={{ ml: 1 }}>
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Typography>
                                            {editFields[key] && (
                                                <Box mt={2}>
                                                    {key === 'proofNotRequired' ? (
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={formState[key]}
                                                                    onChange={handleChange}
                                                                    name={key}
                                                                />
                                                            }
                                                            label="Proof Not Required"
                                                        />
                                                    ) : key === 'risk' ? (
                                                        <Select
                                                            fullWidth
                                                            name={key}
                                                            value={formState[key]}
                                                            onChange={handleChange}
                                                            displayEmpty
                                                            margin="normal"
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select Risk Level</em>
                                                            </MenuItem>
                                                            <MenuItem value="High">High</MenuItem>
                                                            <MenuItem value="Medium">Medium</MenuItem>
                                                            <MenuItem value="Low">Low</MenuItem>
                                                        </Select>
                                                    ) : (
                                                        <TextField
                                                            fullWidth
                                                            multiline={key === 'description'}
                                                            rows={key === 'description' ? 4 : 1}
                                                            margin="normal"
                                                            name={key}
                                                            value={formState[key]}
                                                            onChange={handleChange}
                                                            variant="outlined"
                                                            type={key.includes('Date') ? 'date' : 'text'}
                                                            InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
                                                        />
                                                    )}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<SaveIcon />}
                                                        onClick={() => handleSave(key)}
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </Box>
                                            )}
                                            <Divider sx={{ mt: 2 }} />
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography>Loading...</Typography>
                )}
                <Card sx={{ mt: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
                    <CardHeader title="Supporting Documents" sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }} />
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Upload Proof</Typography>
                        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                            <InputLabel htmlFor="upload-proof">Upload File</InputLabel>
                            <Input
                                type="file"
                                id="upload-proof"
                                onChange={handleFileUpload}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <UploadIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </CardContent>
                </Card>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Notification Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => handleAdd('Notification Details')}
                            sx={{ mb: 2 }}
                        >
                            Add
                        </Button>
                        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                            <Table>
                                <StyledTableHead>
                                    <TableRow>
                                        <TableCell>Notification Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Sent On</TableCell>
                                        <TableCell>Mail Status</TableCell>
                                    </TableRow>
                                </StyledTableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Initial Notification</TableCell>
                                        <TableCell>Reminder</TableCell>
                                        <TableCell>2024-06-30</TableCell>
                                        <TableCell>Processed</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={1} // replace with actual count
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                        <Typography>Comments History</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => handleAdd('Comments History')}
                            sx={{ mb: 2 }}
                        >
                            Add
                        </Button>
                        <Typography>No comments found</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                        <Typography>Sub Tasks</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => handleAdd('Sub Tasks')}
                            sx={{ mb: 2 }}
                        >
                            Add
                        </Button>
                        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                            <Table>
                                <StyledTableHead>
                                    <TableRow>
                                        <TableCell>UIN</TableCell>
                                        <TableCell>Activity</TableCell>
                                        <TableCell>Owner</TableCell>
                                        <TableCell>Manager</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </StyledTableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>--</TableCell>
                                        <TableCell>--</TableCell>
                                        <TableCell>--</TableCell>
                                        <TableCell>--</TableCell>
                                        <TableCell>--</TableCell>
                                        <TableCell>--</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={1} // replace with actual count
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Layout>
    );
};

export default EditPage;
