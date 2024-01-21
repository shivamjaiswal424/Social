import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Grid } from '@mui/material'
import { Route, Routes, useLocation } from 'react-router-dom'
import MiddlePart from '../../components/MiddlePart/MiddlePart'
import Reels from '../../components/Reels/Reels'
import CreateReelsForm from '../../components/Reels/CreateReelsForm'
import Profile from '../Profile/Profile'
import HomeRight from '../../components/HomeRight/HomeRight'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/auth.action'


const HomePage = () => {

    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {auth}= useSelector(store=>store);

    
    const location = useLocation();

    console.log("auth ",auth);
    return (
        <div className="px-20">
            <Grid container spacing={0}>
                <Grid item xs={false} lg={3}>
                    <div className='sticky top-0'>
                        <Sidebar />
                    </div>

                </Grid>
                <Grid item className='px-5 flex justify-center' xs={12} lg={location.pathname === "/" ? 6 : 9}>
                    <Routes>
                        <Route path="/" element={<MiddlePart />} />
                        <Route path="/reels" element={<Reels />} />
                        <Route path="/create-reels" element={<CreateReelsForm />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Routes>
                </Grid>
                {location.pathname==="/" &&<Grid item lg={3} className='relative'>
                    <div className="sticky top-0 w-full">
                        <HomeRight />
                    </div>
                </Grid>}
            </Grid>
        </div>
    )
}

export default HomePage;