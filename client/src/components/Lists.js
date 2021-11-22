import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { ListActionCreators } from '../store/redusers/List/actionCreators';

export default function Lists() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ListActionCreators.fetchList())
      }, []);
    const lists = useSelector(state => state.lists.lists)

    return (
                <Grid container justifyContent="center" spacing={2}>
                {lists ? lists?.map(list => (
                        <Grid key={list.id} item>
                            <List list={list} />
                        </Grid>
                    )): null }
                </Grid>
    )
}
