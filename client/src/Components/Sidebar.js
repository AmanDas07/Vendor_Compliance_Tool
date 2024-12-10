import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Button, Modal, TextField, Typography, IconButton, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import useMediaQuery from '@mui/material/useMediaQuery';
import WorkspaceIcon from '@mui/icons-material/Workspaces';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MailIcon from '@mui/icons-material/Mail';
import ChatIcon from '@mui/icons-material/Chat';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../src/api.js';
export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [manageOpen, setManageOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [emailData, setEmailData] = React.useState({
        to: '',
        subject: '',
        message: ''
    });
    const [attachments, setAttachments] = React.useState([]);

    const handleManageClick = () => {
        setManageOpen(!manageOpen);
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setEmailData({ to: '', subject: '', message: '' }); // Reset form
        setAttachments([]); // Reset attachments
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSendEmail = async () => {
        const formData = new FormData();
        formData.append('from', emailData.from);
        formData.append('to', emailData.to);
        formData.append('subject', emailData.subject);
        formData.append('message', emailData.message);

        attachments.forEach((file) => {
            formData.append('attachments', file);
        });

        try {

            formData.forEach((value, key) => {
                console.log(`${key}: ${value instanceof File ? value.name : value}`);
            });
            attachments.forEach((file, index) => {
                console.log(`Attachment ${index + 1}:`, file);
            })
            const response = await api.post('http://localhost:3001/api/v1/email/send', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                toast.success('Email sent successfully!');
                handleModalClose();
            } else {
                toast.success('Failed to send email.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to send email. Please try again.');
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachments((prevFiles) => [...prevFiles, file]);
        }
    };

    const removeAttachment = (index) => {
        setAttachments((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const drawerWidth = 280;

    const drawer = (
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <ToastContainer
                position="top-center"
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
            <List sx={{ flexGrow: 1 }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/alltrackers')}>
                        <ListItemIcon>
                            <TrackChangesIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="All Trackers" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/workspace')}>
                        <ListItemIcon>
                            <WorkspaceIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="My Workspace" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate(`/dashboard/${localStorage.getItem('userRole')}`)}>
                        <ListItemIcon>
                            <DashboardIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="My Dashboard" />
                    </ListItemButton>
                </ListItem>

                {/* Manage Section */}
                <ListItem disablePadding>
                    <ListItemButton onClick={handleManageClick}>
                        <ListItemIcon>
                            <ManageAccountsIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage" />
                        {manageOpen ? <ExpandLessIcon sx={{ color: '#ffffff' }} /> : <ExpandMoreIcon sx={{ color: '#ffffff' }} />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={manageOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/manage/users')}>
                                <ListItemIcon>
                                    <PeopleIcon sx={{ color: '#ffffff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/manage_tracker/assignment')}>
                                <ListItemIcon>
                                    <AssignmentIcon sx={{ color: '#ffffff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Tracker Assignment" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/manage/internal-trackers')}>
                                <ListItemIcon>
                                    <AssignmentTurnedInIcon sx={{ color: '#ffffff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Internal Trackers" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>

            {/* Custom Buttons at Bottom */}
            <Box sx={{ p: 2, mt: 'auto', textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MailIcon />}
                    sx={{
                        mb: 1,
                        width: '100%',
                        backgroundColor: '#4caf50',
                        '&:hover': {
                            backgroundColor: '#388e3c',
                            transform: 'scale(1.05)', // Animation effect
                        },
                        transition: 'transform 0.3s ease-in-out',
                    }}
                    onClick={handleModalOpen}
                >
                    Mail
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ChatIcon />}
                    sx={{
                        width: '100%',
                        backgroundColor: '#f44336',
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                            transform: 'scale(1.05)', // Animation effect
                        },
                        transition: 'transform 0.3s ease-in-out',
                    }}
                    onClick={() => navigate('/inhouse-text')}
                >
                    In-house Text
                </Button>
            </Box>

            {/* Email Modal */}
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="email-modal-title"
                aria-describedby="email-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleModalClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'red',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Send Email
                    </Typography>
                    <TextField
                        label="From"
                        name="from"
                        fullWidth
                        variant="outlined"
                        value={emailData.from}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="To"
                        name="to"
                        fullWidth
                        variant="outlined"
                        value={emailData.to}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Subject"
                        name="subject"
                        fullWidth
                        variant="outlined"
                        value={emailData.subject}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Message"
                        name="message"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={emailData.message}
                        onChange={handleInputChange}
                    />

                    {/* Attachments Section */}
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button variant="contained" component="label" startIcon={<AttachFileIcon />}>
                            Attach File
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                        <Button variant="contained" component="label" startIcon={<ImageIcon />}>
                            Attach Image
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                        <Button variant="contained" component="label" startIcon={<DescriptionIcon />}>
                            Attach PDF
                            <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
                        </Button>
                    </Stack>

                    {/* Display Selected Attachments */}
                    <Box sx={{ mt: 2 }}>
                        {attachments.length > 0 ? (
                            attachments.map((file, index) => (
                                <Chip
                                    key={index}
                                    label={file.name}
                                    onDelete={() => removeAttachment(index)}
                                    sx={{ margin: 0.5 }}
                                    color="primary"
                                    deleteIcon={<CloseIcon />}
                                />
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No attachments selected
                            </Typography>
                        )}
                    </Box>

                    <Button variant="contained" color="primary" fullWidth onClick={handleSendEmail} sx={{ mt: 2 }}>
                        Send
                    </Button>
                </Box>
            </Modal>
        </Box>
    );

    return (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1e1e2f',
                    color: '#ffffff',
                },
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            {drawer}
        </Drawer>
    );
}
