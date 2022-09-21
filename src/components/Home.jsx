import React from 'react'
import { Navigate } from 'react-router-dom'
import { ApplicationViews } from './ApplicationViews'

export const Home = () => {
    if (localStorage.getItem("scratch_user_id")) {
      return(
        <>
            <ApplicationViews />
        </>
        )
    } else {
        return (<Navigate to="/login" />)
    }
}

