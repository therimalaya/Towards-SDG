import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { AppBar, Toolbar } from '@material-ui/core';
import FormWrapper from './Components/FormWrapper'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                NMBU towards SDG
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function MyAppBar() {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">NMBU towards Sustainable Development Goal</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default function App() {
    return (
        <React.Fragment>
            <MyAppBar />
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>NMBU towards SDG</Typography>
                    <FormWrapper />
                    <Copyright />
                </Box>
            </Container>
        </React.Fragment>
    );
}
