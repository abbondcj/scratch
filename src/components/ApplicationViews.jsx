import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Courses } from './courses/FavoriteCourses'
import { Dashboard } from './dashboard/Dashboard'
import { FindCourse } from './play/FindCourse'
import { Play } from './play/Play'
import { Profile } from './profile/Profile'
import { Stats } from './stats/Stats'

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="/find-course" element={<FindCourse />}></Route>
        <Route path="stats" element={<Stats />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  )
}

