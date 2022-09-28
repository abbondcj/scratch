import React from 'react'
import { useEffect, useState } from 'react'
import { Nav } from '../nav/Nav'
import { favorite_courses, rounds } from '../ApiManager'
import './Scores.css'
import { useNavigate } from 'react-router-dom'

export const Scores = () => {
  const [completedRounds, setCompletedRounds] = useState([])
  const [favoriteCourses, setFavoriteCourses] = useState([])
  const [totalNineHoleRounds, setTotalNineHoleRounds] = useState("0")
  const [averageScoreNine, setAverageScoreNine] = useState("0")
  const [totalEighteenHolerounds, setTotalEighteenHoleRounds] = useState("0")
  const [averageScoreEighteen, setAverageScoreEighteen] = useState("0")
  const [incompleteRounds, setIncompleteRounds] = useState(0)
  const [aces, setAces] = useState(0)
  const [albatrosses, setAlbatrosses] = useState(0)
  const [eagles, setEagles] = useState(0)
  const [birdies, setBirdies] = useState(0)
  const [pars, setPars] = useState(0)
  const [bogeys, setBogeys] = useState(0)
  const [doubleBogeys, setDoubleBogeys] = useState(0)
  const [tripleBogeyPlus, setTripleBogeyPlus] = useState(0)
  const [displayRoundScorecard, setDisplayScorecard] = useState(0)
  const navigate = useNavigate()

  useEffect(
    () => {
      fetch(rounds + `?userId=${localStorage.getItem("scratch_user_id")}`)
      .then(res => res.json())
      .then(
        (data) => {
          setCompletedRounds(data)
          let nineHoleRoundCounter = 0
          let nineHoleScoreCounter = 0
          let eighteenHoleRoundCounter = 0
          let eighteenHoleScoreCounter = 0
          let averageNineHoleScoreCopy = 0
          let averageEighteenHoleScoreCopy = 0
          let aceCopy = 0
          let albatrossCopy = 0
          let eagleCopy = 0
          let birdieCopy = 0
          let parCopy = 0
          let bogeyCopy = 0
          let doubleBogeyCopy = 0
          let tripleBogeyPlusCopy = 0
          data.map(
            (round) => {
              if (round.holesCompleted === 18) {
                eighteenHoleRoundCounter += 1
                eighteenHoleScoreCounter += parseInt(round.roundScore)
                
                
              } else if (round.holesComplete >= 9 && round.holesCompleted < 18) {
                const validholes = round.completedHoles.splice(0, 9)
                validholes.map(
                  (hole) => {
                    nineHoleScoreCounter += parseInt(hole.score)
                  }
                )
                nineHoleRoundCounter += 1
              } else {
                let incompleteRoundsCopy = incompleteRounds
                incompleteRoundsCopy += 1
                setIncompleteRounds(incompleteRoundsCopy)
              }
              round.completedHoles.map(
                (hole) => {
                  if (hole.score === 1) {
                    aceCopy += 1
                  } else if (hole.par - hole.score === 3) {
                    albatrossCopy += 1
                  } else if (hole.par - hole.score === 2) {
                    eagleCopy += 1
                  } else if (hole.par - hole.score === 1) {
                    birdieCopy += 1
                  } else if (hole.par - hole.score === 0) {
                    parCopy += 1
                  } else if (hole.par - hole.score === -1) {
                    bogeyCopy += 1
                  } else if (hole.par - hole.score === -2) {
                    doubleBogeyCopy += 1
                  } else {
                    tripleBogeyPlusCopy += 1
                  }
                }
              )
          
            }
          )
          if (eighteenHoleRoundCounter === 0) {
            setAverageScoreEighteen(0)
            setTotalEighteenHoleRounds(0)
          } else {
            averageEighteenHoleScoreCopy = eighteenHoleScoreCounter / eighteenHoleRoundCounter
            setAverageScoreEighteen(averageEighteenHoleScoreCopy)
            setTotalEighteenHoleRounds(eighteenHoleRoundCounter.toFixed(0))
          }
          if (nineHoleRoundCounter === 0) {
            setAverageScoreNine(0)
            setTotalNineHoleRounds(0)
          } else {
            averageNineHoleScoreCopy = nineHoleScoreCounter / nineHoleRoundCounter
            setAverageScoreNine(averageNineHoleScoreCopy)
            setTotalNineHoleRounds(nineHoleRoundCounter.toFixed(0))
          }
          setAces(aceCopy)
          setAlbatrosses(albatrossCopy)
          setEagles(eagleCopy)
          setBirdies(birdieCopy)
          setPars(parCopy)
          setBogeys(bogeyCopy)
          setDoubleBogeys(doubleBogeyCopy)
          setTripleBogeyPlus(tripleBogeyPlusCopy)

          }
      )
    }, []
  )

  useEffect(
    () => {
      fetch(favorite_courses + `?userId=${localStorage.getItem("scratch_user_id")}`)
      .then(res => res.json())
      .then((data) => {setFavoriteCourses(data)})
    }, []
  )
  

  return (
    <>
      <Nav />
      <h3>Scores</h3>
      <div className="stats">
        <div className="scores_totals">
          <div>
            <p><b>Total 9 Hole Rounds:</b> <br></br>{totalNineHoleRounds}</p>
            <p><b>Total Average Score (9 holes):</b> <br></br>{averageScoreNine}</p>
          </div>
          <div>
            <p><b>Total 18 Hole Rounds:</b> <br></br>{totalEighteenHolerounds}</p>
            <p><b>Total Average Score (18 holes):</b> <br></br>{averageScoreEighteen}</p>
          </div>
          <div>
            <p><b>Incomplete Rounds (Less than 9 holes):</b> <br></br>{incompleteRounds}</p>
          </div>
        </div>
        <div className="stats_totals">
          <div>
            <p><b>Aces:</b> <br></br>{aces}</p>
            <p><b>Albatrosses:</b> <br></br>{albatrosses}</p>
            <p><b>Eagles:</b> <br></br>{eagles}</p>
          </div>
          <div>
            <p><b>Birdies:</b> <br></br>{birdies}</p>
            <p><b>Pars:</b> <br></br>{pars}</p>
            <p><b>Bogeys:</b> <br></br>{bogeys}</p>
          </div>
          <div>
            <p><b>Double Bogeys:</b> <br></br>{doubleBogeys}</p>
            <p><b>Triple+ Bogeys:</b> <br></br>{tripleBogeyPlus}</p>
          </div>
        </div>
      </div>
      <h3>Rounds</h3>
      <div className="completed_rounds_container">
        {
          completedRounds.length > 0 ?
          completedRounds.map((round) => {
            for (const favCourse of favoriteCourses) {
                if (round.favoriteCourseId != null && parseInt(round.favoriteCourseId) === favCourse.id) {
                    return (
                        <div className="round_result" key={round.id}>
                          <h3>{favCourse.name}</h3>
                          <p>Date: {round.date}</p>
                          <p># of Holes: {round.completedHoles.length}</p>
                          <p>Score: {round.roundScore}</p>
                          <p>Rating: {round.rating === "0" ? round.rating/5.0 : `No Rating`}</p>
                          <div className="scorecard_display">
                            {
                              displayRoundScorecard === round.id ?
                              <div className="scorecard_label">
                                <p>Hole #</p>
                                <p>Par</p>
                                <p>Score</p>
                              </div> : ``
                            }
                            <div>
                              {
                                displayRoundScorecard === round.id ?
                                <>
                                <div className="hole_label">
                                  {
                                    round.completedHoles.map((hole) => {
                                      return (
                                        <div key={round.id + hole.holeNumber}>
                                          <p>{hole.holeNumber}</p>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <div className="hole_label">
                                  {
                                    round.completedHoles.map((hole) => {
                                      return (
                                        <div key={round.id + hole.holeNumber}>
                                          <p>{hole.par}</p>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <div className="hole_label">
                                  {
                                    round.completedHoles.map((hole) => {
                                      return (
                                        <div key={round.id + hole.holeNumber}>
                                          <p>{hole.score}</p>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <button onClick={() => {setDisplayScorecard(0)}}>Close scorecard</button>
                                </>
                                :
                                <button value={round.id} onClick={(e) => {setDisplayScorecard(parseInt(e.target.value))}}>View scorecard</button>                            
                              }
                            </div>
                          </div>                      
                        </div>
                    )
                } 
    
                if (round.favoriteCourseId === null) {
                    let [courseName] = round.nonFavoriteCourseId.split("--")
                    return (
                        <div className="round_result" key={round.id}>
                          <h3>{courseName}</h3>
                          <p>Date: {round.date}</p>
                          <p>Holes completed: {round.holesCompleted}</p>
                          <p>Score: {round.roundScore}</p>
                          <p>Rating: {round.rating === "0" ? round.rating/5.0 : `No Rating`}</p>
                          <div className="scorecard_display">
                            {
                              displayRoundScorecard === round.id ?
                              <div className="scorecard_label">
                                <p>Hole #</p>
                                <p>Par</p>
                                <p>Score</p>
                              </div> : ``
                            }
                            <div>
                              {
                                displayRoundScorecard === round.id ?
                                <>
                                <div className="hole_label">
                                  {
                                    round.completedHoles.map((hole) => {
                                      return (
                                        <div key={round.id + hole.holeNumber}>
                                          <p>{hole.holeNumber}</p>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <div className="hole_label">
                                  {
                                    round.completedHoles.map((hole) => {
                                      return (
                                        <div key={round.id + hole.holeNumber}>
                                          <p>{hole.par}</p>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <div className="hole_label">
                                  {
                                    round.completedHoles.map((hole) => {
                                      return (
                                        <div key={round.id + hole.holeNumber}>
                                          <p>{hole.score}</p>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                <button onClick={() => {setDisplayScorecard(0)}}>Close scorecard</button>
                                </>
                                :
                                <button value={round.id} onClick={(e) => {setDisplayScorecard(parseInt(e.target.value))}}>View scorecard</button>                            
                              }
                            </div>
                          </div>                      
                        </div>
                    )
                }
            }
        }) : <button id="play_button" onClick={() => {navigate("/play")}}>Play</button>
        }
      </div>
    </>
  )
}

