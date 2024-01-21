import React from 'react'
import { navigationMenu } from './sidebarNavigation'
import { Avatar, Card, Divider, Menu, MenuItem } from '@mui/material'
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const {auth}= useSelector(store=>store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate=useNavigate();
  const handleNavigate=(item)=>{
    if(item.title=="Profile"){
      navigate(`/profile/${auth.user.id}`)
    }
    if(item.title=="Home"){
      navigate(`/`)
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className="space-y-8 pl-5 pb-10">
        <div className=''>
          <span className='logo font-bold text-xl'>Shivam Social</span>
        </div>
        <div className="space-y-10">
          {navigationMenu.map((item) =>
            <div onClick={()=>handleNavigate(item)} className='flex space-x-3 items-center cursor-pointer'>
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>)}
        </div>
      </div>
      <Divider />
      <div className="pl-5 flex items-center justify-between pt-5">
        <div className="flex items-center space-x-3">
          <Avatar src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
          <div>
            <p className="font-bold">{auth.user?.firstName+" "+auth.user?.lastName}</p>
            <p className='opacity-70'>@{auth.user?.firstName.toLowerCase()+"_"+auth.user?.lastName.toLowerCase()}</p>

          </div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar