import React, { useEffect } from 'react';
import { Button, Card, CardActions, Typography, CardContent, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ListActionCreators } from '../store/redusers/List/actionCreators';
import Item from './Item';

export default function List({ listName, id, items }) {
    console.log(listName)
    // const {items} = useSelector(state => state.items)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListActionCreators.fetchItems(id))
    }, []);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent container spacing={2}>
                <Typography gutterBottom variant="h5" component="div">
                    {listName}
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                {items ? items.map(item => 
                <Grid key={item.id} item>
                <Item item={item} />
                </Grid>
                ) : null}
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small">Add Card</Button>
                <Button size="small">Remove List</Button>
            </CardActions>
        </Card>
    )
}
                // <Typography variant="body2" color="text.secondary">
                //     {items ? items.map(item => <Item key={item.id} {...item} />) : null}
                // </Typography>