import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import List from './List';

export default function Lists({ lists }) {
    // console.log(lists)
    return (
                <Grid container justifyContent="center" spacing={2}>
                {lists.map(list => (
                        <Grid key={list.id} item>
                            <List {...list} />
                        </Grid>
                    ))}
                </Grid>
    )
}
