import React from 'react';
import { Button, Card, CardActions, Typography, CardContent} from '@mui/material';

export default function Item({item}) {
    const {itemName, updatedAt} = item;
    const updateTime = ' ' + updatedAt;
    function dragStartHandler(e,list,item) {
        // e.preventDefault()
        console.log("------------")
    }
    function dragEndHandler(e) {}
    function dragLeaveHandler(e) {}
    function dragOverHandler(e) {}
    function dropHandler(e,list,item) {
        e.preventDefault()
    }
    return (
        <Card sx={{ maxWidth: 340 }}
            onDragStart={e => dragStartHandler(e,item)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropHandler(e,item)}
            draggable={true}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {updateTime}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Remove Card</Button>
        </CardActions>
      </Card>
    )
}
