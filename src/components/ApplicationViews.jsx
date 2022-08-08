import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FavoriteCourses } from './courses/FavoriteCourses'
import { Dashboard } from './dashboard/Dashboard'
import { Play } from './play/Play'
import { Profile } from './profile/Profile'
import { Stats } from './stats/Stats'

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Dashboard />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="stats" element={<Stats />}></Route>
        <Route path="/favorite-courses" element={<FavoriteCourses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  )
}

