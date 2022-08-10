import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Play = () => {
  const navigate = useNavigate()
  return (
    <>
      <div>Play</div>
      <button onClick={() => {navigate("/find-course")}}>Find a course</button>
    </>
  )
}

