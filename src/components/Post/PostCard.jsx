import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const {post,auth}=useSelector(store=>store);
  const handleShowComments = () => setShowComments(!showComments)

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content
      }
    }
    dispatch(createCommentAction(reqData))
  }
  const handleLikePost=()=>{
    dispatch(likePostAction(item.id))
  }

  console.log("is like ",isLikedByReqUser(auth.user.id,item) )
  return (
    <Card className=''>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            S
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={"@" + item.user.firstName.toLowerCase() + "_" + item.user.lastName.toLowerCase()}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Dhokla"
      /> */}
      <img className='w-full max-h-[30rem] object-cover object-top' src={item.image} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id,item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton onClick={handleShowComments}>
            {<CommentIcon />}
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>



        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {showComments && <section>
        <div className='flex items-center space-x-5 mx-3 my-5'>
          <Avatar sx={{}} />
          <input onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCreateComment(e.target.value)
              console.log("Enter press-----", e.target.value)
            }
          }} className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2' type="text" placeholder='write your comment' />
        </div>
        <Divider />
        <div className='mx-3 space-y-2 my-5 text-xs'>

          {item.comments?.map((comment) => <div className='flex items-center space-x-5'>
            <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
              {comment.user.firstName[0]}
            </Avatar>

            <p>{comment.content}</p>

          </div>)}


        </div>
      </section>}
    </Card>
  )
}

export default PostCard