import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ApplicationViews } from './ApplicationViews'
import { Nav } from './nav/Nav'

export const Home = () => {
    const user = localStorage.getItem("scatch_user_id")
    if (user) {
      return(
        <>
            <Nav />
            <ApplicationViews />
        </>
        )
    } else {
        return (<Navigate to="/login" />)
    }
}

