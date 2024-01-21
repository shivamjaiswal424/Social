import { Card, Grid } from '@mui/material'
import React from 'react'
import Login from './Login'
import Register from './Register'
import HomePage from '../HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'

const Authentication = () => {
  return (
    <Grid container>
      <Grid className='h-screen overflow-hidden' item xs={8}>
        <img src="https://cdn.pixabay.com/photo/2017/12/13/18/05/networks-3017398_1280.jpg" alt="" className="h-full wfull" />
      </Grid>
      <Grid item xs={4} >
        <div className="px-2 flex flex-col justify-center h-full">
          <Card className="card p-8">
            <div className='flex flex-col items-center mb-5 space-y-1'>
              <h1 className='logo text-center'>Shivam Social</h1>
              <p className='text-center text-sm w-[70&]'>Explore. Connect. Discover. Welcome to Your New Social Universe.</p>
            </div>

            <Routes>
              
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>

          </Card>
        </div>
      </Grid>
    </Grid>
  )
}

export default Authentication;