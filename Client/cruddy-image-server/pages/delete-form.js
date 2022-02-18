import { DenseAppBar, headDefs } from "./index.js"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Delete() {
    return (
        <ThemeProvider theme={theme}>
            <headDefs />
            <DenseAppBar />
            <div className="main">
                
                <div>
                    <h1>
                        For the Deletion of files
                    </h1>
                    <form method="get" action="/delete">
                        <TextField id="deletionUUID" label="Standard" variant="standard" type="text" name="deletionUUID"/>
                        <br/>
                        <br/>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
        
    )
}