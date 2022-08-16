import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Play = () => {
  const navigate = useNavigate()
  return (
    <>
      <h3>Play</h3>
      <button onClick={() => {navigate("/find-course")}}>Find a course</button>
    </>
  )
}

