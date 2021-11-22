import React  from 'react';
import { Grid, Paper } from '@mui/material';
import Header from './components/Header';
import Lists from './components/Lists';
import { brown } from '@mui/material/colors';

function App() {
  return (
    <Paper sx={{ bgcolor: brown[50], height: '100vh'  }} >
      <Header/>
      <Grid sx={{ flexGrow: 1, mt: "4px",  bgcolor: brown[50] }} container spacing={2}>
        <Grid item xs={12}>
          <Lists />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;
