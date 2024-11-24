import React from 'react';
import { Helmet } from "react-helmet";
import { Box, CssBaseline } from '@mui/material';
import PrimarySearchAppBar from './Components/Header';
import Sidebar from './Components/Sidebar';
import './footer.css';  // Ensure that your footer styles are imported
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
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <PrimarySearchAppBar handleDrawerToggle={handleDrawerToggle} />
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                {/* Main content area */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: theme => theme.spacing(8),
                        width: { sm: `100vw` },
                    }}
                >
                    {props.children}
                </Box>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content" >
                        <p>Powered by Complisense © 2024 All Rights Reserved.</p>
                    </div>
                </footer>
            </Box>
        </>
    );
}

export default Layout;
