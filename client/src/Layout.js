import React from 'react';
import { Helmet } from "react-helmet";
import { Box, CssBaseline } from '@mui/material';
import PrimarySearchAppBar from './Components/Header';
import Sidebar from './Components/Sidebar';

const Layout = (props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{props.title}</title>
            </Helmet>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <PrimarySearchAppBar handleDrawerToggle={handleDrawerToggle} />
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <Box
                    component="main"
                    sx={{
                        mt: theme => theme.spacing(8),
                        width: { sm: `100vw` },
                        height: { sm: `55vw` },

                    }}
                >
                    {props.children}
                </Box>
            </Box>
        </>
    );
}

export default Layout;
