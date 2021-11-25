import React, { useEffect, useState } from 'react';
import { FormControl, Input, InputLabel, Card, Typography, CardContent, Grid, IconButton, InputAdornment } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { ListActionCreators } from '../store/redusers/List/actionCreators';
import Item from './Item';
import { green, lightBlue } from '@mui/material/colors';



export default function List({ list }) {
    const [itemName, setItemName] = useState("")
    const { listName, id, items } = list
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListActionCreators.fetchItems(id))
    }, []);
    const dragOverHandler = e => {
        e.preventDefault()
        if (e.target.className === 'dragOverItem') {
            e.target.style.boxShadow = '0 5px 4px gray'
        }
    }
    const dropItemHandler = (e, list) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(ListActionCreators.moveItem(list))
    }
    const deleteHandler = () => {
        dispatch(ListActionCreators.deleteList(list))
    }
    const addItem = e => {
        console.log("add Item:", itemName)
        dispatch(ListActionCreators.createItem(itemName, list))
        setItemName("")
    }
    return (
        <Card sx={{ maxWidth: 275, bgcolor: lightBlue[100], mx: "20px", borderRadius: 2 }}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropItemHandler(e, list)}
        >
            <CardContent spacing={3}>
                <Typography gutterBottom variant="h5" component="div">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {listName}
                        <IconButton color="secondary"
                            disabled={!!items?.length}
                            onClick={deleteHandler}
                            size="small"
                            sx={{ position: "relative", top: 0, right: 0 }}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Grid>
                </Typography>
                <Grid container component="form" justifyContent="center" spacing={1}>
                    {items ? items.map(x =>
                        <Grid key={x.id} item>
                            <Item item={x} list={list} dragOverEl />
                        </Grid>
                    ) : null}
                    <FormControl fullWidth sx={{ mx: "20px", }} variant="standard" >
                        <InputLabel htmlFor="new-item">Type new item...</InputLabel>
                        <Input
                            id="new-item"
                            variant="standard"
                            value={itemName}
                            onChange={e => { setItemName(e.target.value) }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton type="submit" disabled={!itemName} onClick={addItem} size="small" sx={{ color: green[400] }}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </CardContent>
        </Card>
    )
}
