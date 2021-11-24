import React, { useState } from 'react';
import { FormControl, Input, InputLabel, InputAdornment, AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { blue, green, } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { ListActionCreators } from '../store/redusers/List/actionCreators';

export default function Header() {
    const [listName, setlistName] = useState("");
    const dispatch = useDispatch();
    const addList = e => {
        dispatch(ListActionCreators.createList(listName))
        setlistName("")
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: blue[200] }}>
                <Toolbar component="form">

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        React Trello-like App
                    </Typography>

                    <FormControl sx={{ mx: "20px", }} variant="standard">
                    <InputLabel htmlFor="new-item">Type list title...</InputLabel>
                    <Input
                        id="new-item"
                        variant="standard"
                        value={listName}
                        onChange={e => { setlistName(e.target.value) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton  type="submit" disabled={!listName} onClick={addList} size="small" sx={{ color: green[400] }}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
