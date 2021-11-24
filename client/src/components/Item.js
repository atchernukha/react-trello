import React from 'react';
import { Grid, IconButton, Card, Typography, CardContent } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { indigo } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { ListActionCreators } from '../store/redusers/List/actionCreators';

export default function Item({ item, list }) {
  const { itemName, updatedAt } = item;
  const updateTime = ' ' + updatedAt;
  // const isDragOver = true;
  const dispatch = useDispatch()
  function dragStartHandler(e, list, item) {
    dispatch(ListActionCreators.dragStartItem(item, list))
  }
  function dragEndHandler(e) {
    // e.target.style.boxShadow = 'none'
    e.target.style.background = 'none'
  }
  function dragLeaveHandler(e) {
    // e.target.style.boxShadow = 'none'
    e.target.style.background = 'lightgray'
  }
  function dragOverHandler(e, isDragOver = false) {
    e.preventDefault()
    // if(isDragOver) {
    // e.target.style.boxShadow = '0 4px 3px gray'
    e.target.style.background = 'lightgray'
    // }
  }
  function dropHandler(e, list, item) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(ListActionCreators.moveItem(list,item))
  }
  const removeItem = () => {
    const id = item.id
    dispatch(ListActionCreators.deleteItem(id, list))
  }
  return (
    <Card  sx={{ minWidth: 230, bgcolor: indigo[100], borderRadius: 2 }}
      classes={{
        root: "item", // class name, e.g. classes-nesting-root-x
        // label: classes.label, // class name, e.g. classes-nesting-label-x
      }}
      onDragStart={e => dragStartHandler(e, list, item)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragEnd={e => dragEndHandler(e)}
      onDragOver={e => dragOverHandler(e)}
      onDrop={e => dropHandler(e, list, item)}
      draggable={true}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
        {itemName}
          <IconButton color="secondary" onClick={ removeItem }>
          <HighlightOffIcon />
          </IconButton>
          </Grid>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {updateTime}
        </Typography>
      </CardContent>
    </Card>
  )
}
