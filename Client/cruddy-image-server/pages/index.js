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

export function ApiCard(props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 375, minHeight: 100, bgcolor: "#FFF" }} style = {{margin:"0.3rem"}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="primary.main" gutterBottom>
          {props.apiName}
        </Typography>
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
            Cruddy Web Server
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default function Home() {
  return (
    <main>
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
          <ApiCard apiName="/upload" apiDesc = "The API endpoint for uploading files" />
          <ApiCard apiName="/delete" apiDesc = "The API endpoint for deleting files" />
          <ApiCard apiName="/textUpload" apiDesc = "The API endpoint for uploading text" />
        </div>
        
      </div>
    </main>

  )
}
