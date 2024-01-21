import HomeIcon from '@mui/icons-material/Home';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';
import ControlPointSharpIcon from '@mui/icons-material/ControlPointSharp';
import NotificationsActiveSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';

export const navigationMenu=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title:"Reels",
        icon:<ExploreSharpIcon/>,
        path:"/reels"
    },
    {
        title:"Create Reels",
        icon:<ControlPointSharpIcon/>,
        path:"/create-reels"
    },
    {
        title:"Notification",
        icon:<NotificationsActiveSharpIcon/>,
        path:"/"
    },
    {
        title:"Message",
        icon:<MessageIcon/>,
        path:"/message"
    },
    {
        title:"Lists",
        icon:<ViewListIcon/>,
        path:"/"
    },
    {
        title:"Communities",
        icon:<GroupIcon/>,
        path:"/"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    }

]