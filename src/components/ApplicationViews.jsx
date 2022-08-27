import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Courses } from './courses/FavoriteCourses'
import { Dashboard } from './dashboard/Dashboard'
import { FindCourse } from './play/FindCourse'
import { Play } from './play/Play'
import { Scorecard } from './play/Scorecard'
import { Profile } from './profile/Profile'
import { Scores } from './stats/Scores'

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="/find-course" element={<FindCourse />}></Route>
        <Route path="/scores" element={<Scores />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/scorecard" element={<Scorecard />}></Route>
      </Routes>
    </>
  )
}

