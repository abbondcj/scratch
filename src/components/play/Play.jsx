import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Play.css'

export const Play = () => {
  const navigate = useNavigate()
  return (
    <>
      <h3>Play</h3>
      <button id="find_course_button" onClick={() => {navigate("/find-course")}}>Find a course</button>
    </>
  )
}

