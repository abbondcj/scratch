import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { favorite_courses } from '../ApiManager'
import { Nav } from '../nav/Nav'
import './FavoriteCourse.css'

const addFavoriteCourse = (coursObj) => {
  const courseInfoCopy = {
    userId : parseInt(localStorage.getItem("scratch_user_id")),
    name : coursObj.course_details.result.name ? coursObj.course_details.result.name : "",
    address : coursObj.course_details.result.formatted_address ? coursObj.course_details.result.formatted_address : "",
    phone : coursObj.course_details.result.formatted_phone_number ? coursObj.course_details.result.formatted_phone_number : "",
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
        if (data.course_details.result.permanently_closed) {
          window.alert("course is permanently closed")
        } else {
          addFavoriteCourse(data)
        }
      }
    )
}


export const Courses = () => {
  const [favoriteCourseList, setFavoriteCourseList] = useState([])
  const [favoriteListEdited, setFavoriteListEdited] = useState(false)
  const navigate = useNavigate()
  
  const removeFavorite = (id) => {
    fetch(favorite_courses + `/?id=${id}`)
    .then(res => res.json())
    .then((data) => {
      const course = {...data[0]}
      fetch(favorite_courses + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(course)
        })
        setFavoriteListEdited(!favoriteListEdited)
    })
  }

  useEffect(
    () => {
      fetch(favorite_courses + `?userId=${localStorage.getItem("scratch_user_id")}`)
      .then(res => res.json())
      .then(
        (data) => {
          setFavoriteCourseList(data)
        }
      )
    }, [favoriteListEdited]
  )
  
  


  return (
    <>
      <Nav />
      <h3>Favorite Courses</h3>
      <button id="find_course_button" onClick={() => {navigate("/find-course")}}>Find a course</button>
      <div className="favorite_courses_container">
        {
          favoriteCourseList.length > 0 ? 
          favoriteCourseList.map(
            (course) => {
              return (
                <div key={course.id} className="favorite_course_result">
                            <p id="course_name">{course.name}</p>
                            <p>{course.address}</p>
                            <p>{course.phone}</p>
                            <p>Google Rating: {course.rating? course.rating + `/10` : `Not Available`}</p>
                            <a href={course.website}>Website</a>
                            <a href={course.goolgeMaps}>Directions</a>
                            <div className="course_buttons">
                                <button>Play</button>
                                <button 
                                value={course.id}
                                onClick={
                                    (e) => {
                                      removeFavorite(e.target.value)
                                    }
                                }>
                                    Remove
                                </button>
                            </div>
                        </div>
              )
            }
          ) : 
          <button onClick={() => {navigate("/find-course")}}>Add Courses</button>
        }
      </div>
    </>
  )
}

