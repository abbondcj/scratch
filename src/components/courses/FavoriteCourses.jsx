import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Courses = () => {
  const navigate = useNavigate()
  return (
    <>
      <h3>Courses</h3>
      <button onClick={() => {navigate("/find-course")}}>Find a course</button>
    </>
  )
}

