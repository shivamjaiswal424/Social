import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
import WestIcon from '@mui/icons-material/West';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import SearchUser from './components/SearchUser/SearchUser';
import SearchUser from '../SearchUser/SearchUser';
import "./Message.css"
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { createMessage, getAllChats } from '../../Redux/Message/Message.action';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../../utils/uploadToCloudnary';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SockJS from 'sockjs-client';

import Stom from 'stompjs';

const Message = () => {

  const dispatch = useDispatch();


  const { message, auth } = useSelector((store) => store);

  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  const chatContainerRef=useRef(null);

  useEffect(() => {
    dispatch(getAllChats())
  }, []);

  console.log("chats ----", message.chats)

  const handleSelectImage = async (e) => {
    setLoading(true)
    console.log("handle select image...");
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image")
    setSelectedImage(imgUrl)
    setLoading(false)

  };

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }))
  };

  useEffect(() => {
    setMessages([...messages, message.message])
  }, [message.message])

  const [stompClient, setStompClient] = useState(null);
  useEffect(() => {
    const sock = new SockJS("http://localhost:5454/ws")
    const stomp = Stom.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr)
  }, [])

  const onConnect = () => {
    console.log("cwebsocket connected...")
  }

  const onErr = (error) => {
    console.log("error", error)
  }

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(`/user/${currentChat?.id}/private`, onMessageReceive)
    }
  })

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {},
       JSON.stringify(newMessage))
    }
  }

  const onMessageReceive = (payload) => {

    const receivedMessage = JSON.parse(payload.body)
    console.log("message receive from websocket", receivedMessage)
    setMessages([...messages, receivedMessage])

  }

  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop=chatContainerRef.currentscrollheight;
    }
  },[messages])
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid className='px-5' item xs={3}>
          <div className='Flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5'>
                <WestIcon />
                <h1 className='text-xl font-bold'>Home</h1>

              </div>
              <div className='h-[83vh]'>
                <div className=''>
                  <SearchUser />
                </div>

                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                  {
                    message.chats.map((item) => {

                      return <div onClick={() => {
                        setCurrentChat(item)
                        setMessages(item.messages)
                      }}>
                        <UserChatCard chat={item} />
                      </div>
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full' item xs={9}>
          {currentChat ? <div>
            <div className='flex justify-between items-center border-l p-5'>
              <div className='flex items-center space-x-3'>
                <Avatar src="https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=600" />
                <p>{auth.user?.id === currentChat.users[0]?.id ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName :
                  currentChat.users[0].firstName + " " + currentChat.users[0].lastName}</p>
              </div>
              <div className='flex space-x-3'>
                <IconButton>
                  <CallIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>


            </div>
            <div ref={chatContainerRef} className='hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5'>
              {messages.map((item) => <ChatMessage item={item} />)}
            </div>
            <div className='sticky bottom-0 border-l'>
              {selectedImage && <img className="w-[5rem] h-[5rem] object-cover px-2" src={selectedImage} alt="" />}
              <div className='py-5 flex items-center justify-center space-x-5'>

                <input
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleCreateMessage(e.target.value)
                      setSelectedImage("")
                    }
                  }}
                  className='bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5' placeholder='Type message...' type="text" />
                <div>
                  <input type="file" accept="image/*" onChange={handleSelectImage} className='hidden' id="image-input" />
                  <label htmlFor="image-input">
                    <AddPhotoAlternateIcon />
                  </label>
                </div>
              </div>

            </div>
          </div> : <div className='h-full space-y-5 flex flex-col justify-center items-center'>
            <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
            <p className='text-xl font semibold'>No chat Selected</p>

          </div>}



        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Message