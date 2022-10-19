import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { favorite_courses, gc_header } from "../ApiManager";
import { addFavoriteCourse } from "../courses/FavoriteCourses";
import './CourseSearch.css'

export const CourseSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState("")
  const [chosenLat, setChosenLat] = useState("")
  const [chosenLong, setChosenLong] = useState("")
  const [courseList, setCourseList] = useState([])
  const [favoriteCourses, setFavoriteCourses] = useState([])
  const [searchCount, setSearchCount] = useState(0)
  const [receivedError, setReceivedError] = useState(false)
  const [addedFavorite, setAddedFavorite] = useState(false)
  const navigate = useNavigate()

  useEffect(
    () => {
      fetch(favorite_courses + `?userId=${localStorage.getItem("scratch_user_id")}`)
      .then(res => res.json())
      .then(
        (data) => {
          const favoriteCourseList = data.map(course => course)
          setFavoriteCourses(favoriteCourseList)
        }
      )
    }, [courseList]
  )
    
  

  const prepFavoriteCourse = (rawData) => {
    const rawCourseData = rawData.split("--")
    let rawCourseName = rawCourseData[0]
    let rawCourseZipCode = rawCourseData[1]
    const options = {
      method: 'GET',
      headers: gc_header
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
      .then(
        () => {
          setCourseList(prev => [...prev])
        }
      )
  }

  const retrieveCourses = (latParam, longParam) => {
    const lat = latParam
    const long = longParam
    setChosenLat(lat.toString())
    setChosenLong(long.toString())
    const radius = "10"
    const options = {
        method: 'GET',
        headers: gc_header
    };
    
    fetch(`https://golf-course-finder.p.rapidapi.com/courses?radius=${radius}&lat=${lat}&lng=${long}`, options)
        .then(response => response.json())
        .then(
            (data) => {
                setCourseList(data.courses)
                let searchCountCopy = searchCount
                searchCountCopy += 1
                setSearchCount(searchCountCopy)
            }
        )
        .catch((err) => {if (err) {setReceivedError(true)}});
  }

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      setSelectedLocation(description)
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        retrieveCourses(lat.toString(), lng.toString())
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <p className="location_results" key={place_id} onClick={handleSelect(suggestion)}>
          {main_text + ` -- ` + secondary_text}
        </p>
      );
    });

  const handleFavorite = (value) => {
    prepFavoriteCourse(value)  
  }

  return (
    <>
    <div className="find_course_container">
      <input
        id = "user_city_input"
        value={value}
        onChange={handleInput}
        placeholder="Search a city or town"
        />
      <div className="city_result_container">
        {status === "OK" && renderSuggestions()}
      </div>
      {status === "OK" ? <p id="select_location_prompt">Click a location</p> : ``}
    </div>
    <div>
      <div className="course_list_container">
            {chosenLat.length > 0 && receivedError ? <p>City not found</p> : ``}
            {
                courseList.length >= 1 ? <h4>Courses within 10mi of {selectedLocation}</h4> : ``
            }
            {
                courseList.length >= 1 ?
                courseList.map((course, index) => {
                    return (
                        <div key={index} className="course_name_result">
                            <p id="course_name">{course.name}</p>
                            <p>{course.distance}mi from {selectedLocation}</p>
                            <div className="course_buttons">
                                {
                                  favoriteCourses.some(favCourse => favCourse.name.includes(course.name)) ?
                                  <>
                                  
                                  <button 
                                  value={course.name + `--` + course.zip_code}
                                  onClick={
                                    (e) => {
                                      localStorage.removeItem("current_favorite_course_playing")
                                      localStorage.removeItem("current_non_favorite_course_playing")
                                      localStorage.setItem("current_non_favorite_course_playing", e.target.value)
                                      navigate("/scorecard")
                                    }
                                  }>
                                    Play Course
                                  </button>
                                  <button 
                                    value={course.name}
                                    onClick={
                                      (e) => {
                                        navigate("/courses")
                                      }
                                  }>
                                    Go to favorites
                                  </button> 
                                  </>
                                  :
                                  <>
                                  <button 
                                    value={course.name + `--` + course.zip_code}
                                    onClick={
                                      (e) => {
                                        localStorage.removeItem("current_favorite_course_playing")
                                        localStorage.removeItem("current_non_favorite_course_playing")
                                        localStorage.setItem("current_non_favorite_course_playing", e.target.value)
                                        navigate("/scorecard")
                                      }
                                    }>
                                    Play Course
                                  </button>
                                  <button 
                                    value={course.name + '--' + course.zip_code}
                                    onClick={
                                      (e) => {
                                        handleFavorite(e.target.value)
                                      }
                                  }>
                                    Favorite Course
                                  </button>
                                  </>
                                }
                            </div>
                        </div>
                    )
                }) : ``
            }
            {
              chosenLat.length > 0 && receivedError ? <p>No courses near {selectedLocation}</p> : ``
            }
        </div>
    </div>
    </>
  );
};