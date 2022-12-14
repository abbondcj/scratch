import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { favorite_courses } from '../ApiManager'
import { Nav } from '../nav/Nav'
import './Play.css'

export const Play = () => {
  const [favoriteCourseList, getFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(
    () => {
      fetch(favorite_courses + `?userId=${localStorage.getItem("scratch_user_id")}`)
      .then(res => res.json())
      .then(
        (data) => {
          getFavorites(data)
        }
      )
    }, []
  )  

  return (
    <>
      <Nav />
      <h3>Play</h3>
      <button id="find_course_button" onClick={() => {navigate("/find-course")}}>Find a course</button>
      <div className='favorite_courses_container'>
      {
          favoriteCourseList.length > 0 ? 
          favoriteCourseList.map(
            (course) => {
              return (
                <div key={course.id} className="favorite_course_result">
                            <p id="course_name">{course.name}</p>
                            <p>{course.phone}</p>
                            <a href={course.website}>Website</a>
                            <a href={course.goolgeMaps}>Directions</a>
                            <div className="course_buttons">
                                <button value={course.id} onClick={
                                  (e) => {
                                    localStorage.removeItem("current_favorite_course_playing")
                                    localStorage.removeItem("current_non_favorite_course_playing")
                                    localStorage.setItem("current_favorite_course_playing", e.target.value)
                                    navigate("/scorecard")
                                  }
                                }>Play</button>
                            </div>
                        </div>
              )
            }
          ) : 
          ``
        }
      </div>
    </>
  )
}

