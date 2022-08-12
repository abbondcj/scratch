import React, { useState } from "react";
import Geocode from 'react-geocode'
import './FindCourse.css'

export const FindCourse = () => {
    const [inputCity, setInputCity] = useState("")
    const [receivedError, setReceivedError] = useState(false)
    const [inputLatitude, setInputLatitude] = useState("")
    const [inputLongitude, setInputLongitude] = useState("")
    const [inputRadius, setInputRadius] = useState("10")
    const [courseList, setCourseList] = useState([])

    const retrieveCourses = (radParam, latParam, longParam) => {
        const lat = latParam
        const long = longParam
        const radius = radParam
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4a7a12f70bmsh354c4e76be8cdf6p1b69d3jsnf8c18f063789',
                'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
            }
        };
        
        fetch(`https://golf-course-finder.p.rapidapi.com/courses?radius=${radius}&lat=${lat}&lng=${long}`, options)
            .then(response => response.json())
            .then(
                (data) => {
                    console.log(data.courses)
                    setCourseList(data.courses)
                }
            )
            .catch(err => console.error(err));
    }
    

    const getCoord = () => {
        Geocode.setApiKey("AIzaSyDO1chQiHeK_csxfK0sho1VPqYSRYOL1Vc");
        Geocode.fromAddress(inputCity.trim())
        .then(
            (res) => {
                const {lat, lng } = res.results[0].geometry.location
                setInputLatitude(lat.toString())
                setInputLongitude(lng.toString())
            },
            (error) => {
                setReceivedError(true)
            }
            )
        }
        
    const getCourseList = () => {
        retrieveCourses(inputRadius, inputLatitude, inputLongitude)
    }

    return (
     <>
        <h3>Find a course</h3>
        <div className="find_course_container">
            <label>City</label>
            <input onChange={
                (e) => {
                    let inputCityCopy = inputCity
                    inputCityCopy = e.target.value
                    setInputCity(inputCityCopy)
                }
            } />
            <select onChange={
                (e) => {
                    setInputRadius(e.target.value)
                    getCoord()
                }
            }>
                <option value="">Enter radius</option>
                <option value="10">10mi</option>
                <option value="25">25mi</option>
                <option value="50">50mi</option>
                <option value="100">100mi</option>
            </select>
            <p>{receivedError? `${inputCity} could not be found` : ``}</p>
            <button onClick={() => {getCourseList()}}>Find courses</button>
        </div>
        <div className="course_list_container">
            {
                courseList.length > 1 ? <h4>Courses within {inputRadius}mi of {inputCity.trim()}</h4> : ``
            }
            {
                courseList.length > 1 ?
                courseList.map((course) => {
                    return (
                        <div key={course.name} className="course_name_result">
                            <p id="course_name">{course.name}</p>
                            <p>{course.distance}mi from {inputCity.trim()}</p>
                            <div className="course_buttons">
                                <button>Play</button>
                                <button>Favorite</button>
                            </div>
                        </div>
                    )
                }) : ``
            }
        </div>
     </>
    );
   };
