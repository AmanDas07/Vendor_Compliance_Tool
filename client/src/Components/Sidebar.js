import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import WorkspaceIcon from '@mui/icons-material/Workspaces';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const drawerWidth = 280;

    const drawer = (
        <Box sx={{ overflow: 'auto' }}>
            <List>
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
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon sx={{ color: '#ffffff' }} />
                        </ListItemIcon>
                        <ListItemText primary="My Dashboard" />
                    </ListItemButton>
                </ListItem>
            </List>
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
                    color: '#ffffff'
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
