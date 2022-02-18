import Head from 'next/head'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function headDefs() {
  return (
<Head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
</Head>
  )
}

export function ApiCard(props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 375, minHeight: 100, bgcolor: "#000" }} style = {{margin:"0.3rem"}}>
      <CardContent>
        <Button variant="outlined" href={props.href}>
          <Typography sx={{ fontSize: 14 }} color="primary.main" gutterBottom>
            {props.apiName}
          </Typography>
        </Button>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.apiDesc}
        </Typography>
      </CardContent>
    </Card>
  )
}

export function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" component="div">
            <a href='/index.html'>Cruddy Web Server</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main>
      <DenseAppBar />
      <div className='main'>
        <h2>
          Welcome to the Cruddy Web Server!
        </h2>
        <h3>
          Here we host your files and images in exchange for selling all of your personal information!
        </h3>
        <br/>
        <h3>
          Getting Started:
        </h3>
        <p>
          This webserver is under heavy development right now,
          this will be added at a later date
        </p>

        <h2>
          API Routes:
        </h2>
        <div style={{display:"flex", flexDirection:"row"}}>
          <ApiCard apiName="/upload" apiDesc = "The API endpoint for uploading files" href="/upload-form.html"/>
          <ApiCard apiName="/delete" apiDesc = "The API endpoint for deleting files" href="/delete-form.html"/>
          <ApiCard apiName="/textUpload" apiDesc = "The API endpoint for uploading text" href="javascript:void(0)"/>
        </div>
        
      </div>
      </main>
    </ThemeProvider>
    

  )
}
