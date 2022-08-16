import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { favorite_courses } from '../ApiManager'

const addFavoriteCourse = (coursObj) => {
  const courseInfoCopy = {
    name : coursObj.course_details.result.name ? coursObj.course_details.result.name : "",
    address : coursObj.course_details.result.formatted_address ? coursObj.course_details.result.formatted_address : "",
    phone : coursObj.course_details.result.formatted_phone_number ? coursObj.course_details.result.formatted_phone_number : "",
    hours : coursObj.course_details.result.opening_hours.weekday_text.length > 1 ? coursObj.course_details.result.opening_hours.weekday_text : "",
    photos : coursObj.course_details.result.photos.length > 1 ? coursObj.course_details.result.photos : "",
    rating : coursObj.course_details.result.rating ? coursObj.course_details.result.rating : "",
    goolgeMaps : coursObj.course_details.result.url ? coursObj.course_details.result.url : "",
    website : coursObj.course_details.result.website ? coursObj.course_details.result.website : ""
  }
  fetch(favorite_courses, {
    method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(courseInfoCopy)
          }
        )
        .then((res) => res.json())
        .then((data) => {
  })
}

export const prepFavoriteCourse = (rawData) => {
  const rawCourseData = rawData.split("--")
  let rawCourseName = rawCourseData[0]
  let rawCourseZipCode = rawCourseData[1]
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4a7a12f70bmsh354c4e76be8cdf6p1b69d3jsnf8c18f063789',
      'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
    }
  };
  
  fetch(`https://golf-course-finder.p.rapidapi.com/course/details?zip=${rawCourseZipCode}&name=${rawCourseName}`, options)
    .then(response => response.json())
    .then(
      (data) => {
        addFavoriteCourse(data)
      }
    )
}

export const Courses = () => {
  const [favoriteCourseList, setFavoriteCourseList] = useState([])
  const navigate = useNavigate()
  
  


  return (
    <>
      <h3>Courses</h3>
      <button onClick={() => {navigate("/find-course")}}>Find a course</button>
      <h6>My Favorite Courses</h6>
      <div className="favorite_courses_container">
        {
          favoriteCourseList.length > 1 ? <p>map function</p> : <button onClick={() => {navigate("/find-course")}}>Add Courses</button>
        }
      </div>
    </>
  )
}

