import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
    return (
        <div>
            <div className='flex flex-col items-center mr-4 cursor-pointer'>
                <Avatar 
                sx={{ width: "5rem", height: "5rem" }}
                src="https://cdn-icons-png.flaticon.com/128/6997/6997662.png">
                    
                </Avatar>
                <p>Cat</p>
            </div>
        </div>
    )
}

export default StoryCircle