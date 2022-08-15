import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import './CourseSearch.css'

export const CourseSearch = () => {
    const [selectedLocation, setSelectedLocation] = useState("")
    const [courseList, setCourseList] = useState([])
    const [searchCount, setSearchCount] = useState(0)
    const [receivedError, setReceivedError] = useState(false)


  const retrieveCourses = (latParam, longParam) => {
    const lat = latParam
    const long = longParam
    const radius = "10"
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
                let searchCountCopy = searchCount
                searchCountCopy += 1
                setSearchCount(searchCountCopy)
            }
        )
        .catch(err => setReceivedError(true));
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
        console.log("📍 Coordinates: ", { lat, lng });
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

  return (
    <>
    <div className="find_course_container">
      <input
        id = "user_city_input"
        value={value}
        onChange={handleInput}
        placeholder="Where are you going?"
        />
      <div className="city_result_container">
        {status === "OK" && renderSuggestions()}
      </div>
      {status === "OK" ? <p id="select_location_prompt">Click a location</p> : ``}
    </div>
    <div>
      <div className="course_list_container">
            {receivedError? <p>City not found</p> : ``}
            {
                courseList.length >= 1 ? <h4>Courses within 10mi of {selectedLocation}</h4> : ``
            }
            {
                courseList.length >= 1 ?
                courseList.map((course) => {
                    return (
                        <div key={course.name} className="course_name_result">
                            <p id="course_name">{course.name}</p>
                            <p>{course.distance}mi from {selectedLocation}</p>
                            <div className="course_buttons">
                                <button>Play</button>
                                <button>Favorite</button>
                            </div>
                        </div>
                    )
                }) : ``
            }
        </div>
    </div>
    </>
  );
};