import React from 'react'
import { Navigate } from 'react-router-dom'
import { ApplicationViews } from './ApplicationViews'
import { Nav } from './nav/Nav'

export const Home = () => {
    if (localStorage.getItem("scratch_user_id")) {
      return(
        <>
            {/* <Nav /> */}
            <ApplicationViews />
        </>
        )
    } else {
        return (<Navigate to="/login" />)
    }
}

