import React from 'react';
import { Grid, IconButton, Card, Typography, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { indigo } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { ListActionCreators } from '../store/redusers/List/actionCreators';

const useStyles =makeStyles(theme => ({
  dragOverItem:   {} 
}))

export default function Item({ item, list }) {
  const { itemName, updatedAt } = item;
  const updateTime = ' ' + updatedAt;
  const dispatch = useDispatch()
  function dragStartHandler(e, list, item) {
    dispatch(ListActionCreators.dragStartItem(item, list))
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }
  function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.className === 'dragOverItem') {
      e.target.style.boxShadow = '0 4px 3px gray'
  }
  }
  function dropHandler(e, list, item) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(ListActionCreators.moveItem(list, item))
  }
  const removeItem = () => {
    const id = item.id
    dispatch(ListActionCreators.deleteItem(id, list))
  }
  const classes = useStyles();
  return (
    <Card sx={{ minWidth: 230, bgcolor: indigo[100], borderRadius: 2 }}
      className={classes.dragOverItem}
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
            <IconButton color="secondary" onClick={removeItem}>
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
