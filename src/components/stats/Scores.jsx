import React from 'react'
import { useEffect, useState } from 'react'
import { Nav } from '../nav/Nav'
import { rounds } from '../ApiManager'
import './Scores.css'
import { useNavigate } from 'react-router-dom'

export const Scores = () => {
  const [completedRounds, setCompletedRounds] = useState([])
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
  const navigate = useNavigate()

  useEffect(
    () => {
      fetch(rounds)
      .then(res => res.json())
      .then(
        (data) => {
          setCompletedRounds(data)
          let totalRoundCounter = 0
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
              // averageScoreCopy += round.roundScore
              totalRoundCounter += 1
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
            setTotalEighteenHoleRounds(eighteenHoleRoundCounter.toFixed(2))
          }
          if (nineHoleRoundCounter === 0) {
            setAverageScoreNine(0)
            setTotalNineHoleRounds(0)
          } else {
            averageNineHoleScoreCopy = nineHoleScoreCounter / nineHoleRoundCounter
            setAverageScoreNine(averageNineHoleScoreCopy)
            setTotalNineHoleRounds(nineHoleRoundCounter.toFixed(2))
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

  return (
    <>
      <Nav />
      <h3>Scores</h3>
      <div className="stats">
        <div className="scores_totals">
          <div>
            <p>Total 9 Hole Rounds: {totalNineHoleRounds}</p>
            <p>Total Average Score (9 holes): {averageScoreNine}</p>
          </div>
          <div>
            <p>Total 18 Hole Rounds: {totalEighteenHolerounds}</p>
            <p>Total Average Score (18 holes): {averageScoreEighteen}</p>
          </div>
          <div>
            <p>Incomplete Rounds (Less than 9 holes): {incompleteRounds}</p>
          </div>
        </div>
        <div className="stats_totals">
          <div>
            <p>Aces: <b>{aces}</b></p>
            <p>Albatrosses: <b>{albatrosses}</b></p>
            <p>Eagles: <b>{eagles}</b></p>
          </div>
          <div>
            <p>Birdies: <b>{birdies}</b></p>
            <p>Pars: <b>{pars}</b></p>
            <p>Bogeys: <b>{bogeys}</b></p>
          </div>
          <div>
            <p>Double Bogeys: <b>{doubleBogeys}</b></p>
            <p>Triple+ Bogeys: <b>{tripleBogeyPlus}</b></p>
          </div>
        </div>
      </div>
      <h3>Rounds</h3>
      <div className="completed_rounds_container">
        {
          completedRounds.length > 0 ?
          completedRounds.map((round) => {
            if (round.nonFavoriteCourseId != null) {
              let [courseName] = round.nonFavoriteCourseId.split("--")
              return (
                <div key={round.id}>
                  <h3>{courseName}</h3>
                  <p>Holes completed: {round.holesCompleted}</p>
                  <p>Score: {round.roundScore}</p>
                  <button value={round.nonFavoriteCourseId}>View scorecard</button>
                </div>
              )
            } else {
              return (
                <div key={round.id}>
                  <h3>Temps</h3>
                  <p># of Holes: {round.completedHoles.length}</p>
                  <p>Score: {round.roundScore}</p>
                  <button value={round.favoriteCourseId}>View scorecard</button>
                </div>
              )
            }
          }) : <button onClick={() => {navigate("/play")}}>Play Round</button>
        }
      </div>
    </>
  )
}

