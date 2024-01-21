import { Avatar, Button, CardHeader, IconButton } from '@mui/material';
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { purple } from '@mui/material/colors';

const PopularUserCard = () => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title="Shivam Jaiswal"
        subheader="@Shivam424"
      />
    </div>
  )
}

export default PopularUserCard