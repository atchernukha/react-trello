import React,{useEffect} from 'react';
import { Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ListActionCreators } from './store/redusers/List/actionCreators';
import Header from './components/Header';
import Lists from './components/Lists';

import './App.css';

function App() {
  const { lists } = useSelector(state => state.lists);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListActionCreators.fetchList())
  }, []);
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Header/>
        <Lists lists={lists}/>
        <Button variant="contained" onClick={() => { }}>Hello Trello!!!</Button>
      </Grid>
      </Grid>
  );
}

export default App;
