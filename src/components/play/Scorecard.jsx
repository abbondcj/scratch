import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { rounds } from '../ApiManager'
import './Scorecard.css'

export const Scorecard = () => {
  const navigate = useNavigate()
  const [currentFavoriteCourse] = useState(localStorage.getItem("current_favorite_course_playing"))
  const [currentNonFavoriteCourse] = useState(localStorage.getItem("current_non_favorite_course_playing"))
  const [currentHole, setCurrentHole] = useState(1)
  const [currentHolePar, setCurrentHolePar] = useState(3)
  const [currentHoleDistance, setCurrentHoleDistance] = useState(200)
  const [currentHoleScore, setCurrentHoleScore] = useState(0)
  const [currentRoundScore, setCurrentRoundScore] = useState(0)
  const [currentTeeShot, setCurrentTeeShot] = useState()
  const [currentGir, setCurrentGir] = useState(false)
  const [currentPutts, setCurrentPutts] = useState(0)
  const [completedHoles, setCompletedHoles] = useState([])
  const [rating, setRating] = useState(0)
  const parThreeTeeShotOptions = ["Long", "Left", "Green", "Right", "Short"]
  const parFourTeeShotOptions = ["Long", "Left", "Fairway", "Right", "Short"]

  const setHoleResult = () => {
    let holeMatch = null
    for (const hole of completedHoles) {
      if (hole.holeNumber ===  currentHole) {
        holeMatch = hole
      }
    }
    if (holeMatch != null || currentHoleScore === 0) {
      let currentHoleCopy = currentHole
      currentHoleCopy += 1
      setCurrentHole(currentHoleCopy)
    } else {
      const result = {
        holeNumber: currentHole,
        yardage: currentHoleDistance,
        par: currentHolePar,
        teeShot: currentTeeShot,
        gir: currentGir,
        putts: currentPutts,
        score: currentHoleScore
      }
      let completedHolesCopy = [...completedHoles]
      completedHolesCopy.push(result)
      setCompletedHoles(completedHolesCopy)
      let currentRoundScoreCopy = parseInt(currentRoundScore)
      currentRoundScoreCopy += parseInt(currentHoleScore)
      setCurrentRoundScore(currentRoundScoreCopy)
      let currentHoleCopy = currentHole
      currentHoleCopy += 1
      setCurrentHole(currentHoleCopy)
    }
  }


  const DisplayTeeShotOptions = ({holePar}) => {
    if (holePar <= 3) {
      return(
        <>
          {
            parThreeTeeShotOptions.map(
              (parThreeOption) => {
                if (currentTeeShot === parThreeOption) { 
                  return(
                    <div key={parThreeOption}>
                    <label >{parThreeOption}</label>
                    <input checked type="radio" value={parThreeOption} onChange={(e) => {setCurrentTeeShot(e.target.value)}} /> 
                    </div> 
                  )
                } else {
                  return(
                  <div key={parThreeOption}>
                    <label >{parThreeOption}</label>
                    <input type="radio" value={parThreeOption} onChange={(e) => {setCurrentTeeShot(e.target.value)}} />     
                  </div>
                  )
                }
              }
              )
          }
        </>
      )
    } else {
      return(
        <>
          {
            parFourTeeShotOptions.map(
            (parFourOption) => {
              if (currentTeeShot === parFourOption) { 
                return ( 
                  <div key={parFourOption}>
                  <label >{parFourOption}</label>
                  <input checked type="radio" value={parFourOption} onChange={(e) => {setCurrentTeeShot(e.target.value)}} /> 
                  </div>
                  ) 
                } else {
                  return (
                    <div key={parFourOption}>
                    <label >{parFourOption}</label>
                    <input type="radio" value={parFourOption} onChange={(e) => {setCurrentTeeShot(e.target.value)}} />
                    </div>
                    )
                  }
                }
            )
          }
        </>
      )
    }
  }

  useEffect(
    () => {
      if (completedHoles.length > 0) {
        let holeMatch = null
        for (const hole of completedHoles) {
          if (hole.holeNumber ===  currentHole) {
            holeMatch = hole
          }
        }
        if (holeMatch === null) {
          setCurrentHoleDistance(200)
          setCurrentHolePar(3)
          setCurrentTeeShot("")
          setCurrentGir(false)
          setCurrentPutts(0)
          setCurrentHoleScore(0)
        } else {
          setCurrentHoleDistance(holeMatch.yardage)
          setCurrentHolePar(holeMatch.par)
          setCurrentTeeShot(holeMatch.teeShot)
          setCurrentGir(holeMatch.gir)
          setCurrentPutts(holeMatch.putts)
          setCurrentHoleScore(holeMatch.score)
        }
      }
    
    }, [currentHole]
  )

  useEffect(
    () => {
      let currentHoleParCopy = currentHolePar
      setCurrentHolePar(currentHoleParCopy)
    }, [currentHolePar]
  )
  
const submitRound = () => {
    

    if (completedHoles.length > 0) {
      let completedRound = {
        userId : parseInt(localStorage.getItem("scratch_user_id")),
        favoriteCourseId: parseInt(currentFavoriteCourse),
        nonFavoriteCourseId : currentNonFavoriteCourse,
        completedHoles : [...completedHoles],
        holesCompleted: completedHoles.length,
        roundScore: currentRoundScore,
        date : new Date().toDateString(),
        rating: rating
      }

      fetch(rounds, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(completedRound)
      }
    )
    .then((res) => res.json())
    .then(
      () => {
        localStorage.removeItem("current_favorite_course_playing")
        localStorage.removeItem("current_non_favorite_course_playing")
        navigate("/scores")
      }
    )

    }
  }

  
  


  return (
    <>
      <h3>Scorecard</h3>
      <div id="scorecard_container">
        {
          currentHole < 19 ?
          <>
          <p>Hole #{currentHole}</p>
          <p>Total Score: {currentRoundScore}</p>
          <label>Yards:</label>
          <input type="number" placeholder={currentHoleDistance} value={currentHoleDistance} onChange={(e) => {setCurrentHoleDistance(e.target.value)}}></input>
          <label>Par:</label>
          <input type="number" placeholder={currentHolePar} value={currentHolePar} onChange={(e) => {setCurrentHolePar(e.target.value)}}></input>
          <div className='tee_shot'>
            <p>Tee Shot</p>
            <div className="tee_shot_options">
              {
                <DisplayTeeShotOptions holePar={currentHolePar} />
              }
            </div>
          </div>
          <div className="hole_score_results">
              {
                currentGir === true ?
                <>
                  <label>GIR</label>
                  <input checked value={currentGir} type="checkbox" onClick={(e) => {
                    setCurrentGir(e.target.value)
                  }}></input>
                </> : 
                <>
                  <label>GIR</label>
                  <input value={currentGir} type="checkbox" onClick={(e) => {
                    if (e.target.checked) {
                      setCurrentGir(true)
                    } else {
                      setCurrentGir(false)
                    }
                  }}></input>
                </>
              }
              
              <label>Putts</label>
              <input type="number" placeholder={currentPutts} value={currentPutts} onChange={
                (e) => {
                  setCurrentPutts(e.target.value)
                }
              }></input>
              <label>Score</label>
              <input type="number" placeholder={currentHoleScore} value={currentHoleScore} onChange={
                (e) => {
                  setCurrentHoleScore(e.target.value)
                }
              }></input>
          </div>
          <div className="hole_selector_buttons">
            {
              currentHole > 1 ? <button onClick={() => {
                let currentHoleCopy = currentHole
                currentHoleCopy -= 1
                setCurrentHole(currentHoleCopy)
                
              }}>Previous</button> : ``
            }
            {
              currentHole < 19 ? <button onClick={() => {
                setHoleResult()
              }}>Next</button> : ``
              
            }
          </div>
          <button onClick={
            () => {
                if (window.confirm("Current Hole will not be added")) {
                  submitRound()
                  navigate("/scores")
                }
              }
            }>Submit Round
          </button>
          <button onClick={
            () => {
              localStorage.removeItem("current_favorite_course_playing")
              localStorage.removeItem("current_non_favorite_course_playing")
              navigate("/play")
            }
          }>Exit Round</button> 

          </> : 
          <>
          <p>Round Rating</p>
          <div className="rating_container">
            {
              [0,1,2,3,4,5].map((num) => {
                return (
                  <div key={num}>
                  <label >{num}</label>
                  <input type="radio" value={num} name="rating_options" onClick={(e) => {setRating(e.target.value)}}></input>
                  </div>
                )
              })
            }
          </div>
          <button onClick={
            () => {
              window.alert(
                `
                  <p>Current hole will not be added</p>
                  <label>Yes</label>
                  <input type="radio"></input>
                `
              )
              submitRound()
              navigate("/scores")
              }
            }>Submit Round
          </button>
          </>

        }
      </div>
    </>
    )
}

