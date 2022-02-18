import { DenseAppBar, headDefs } from "./index.js"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Upload() {
    return (
        <ThemeProvider theme={theme}>
            <headDefs />
            <DenseAppBar />
            <div className="main">
                <h1>
                    For the Uploading of files
                </h1>
                <form method="POST" action="/upload" enctype="multipart/form-data">
                    <label htmlFor="file">
                        <Input accept="image/*" id="file" type="file" name="file" />
                        <Button variant="contained" component="span" name="file">
                            Upload
                        </Button>
                    </label>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </form>
            </div>
        </ThemeProvider>
        
    )
}