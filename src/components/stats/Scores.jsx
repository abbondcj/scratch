import React from 'react'
import { useEffect, useState } from 'react'
import { Nav } from '../nav/Nav'
import { rounds } from '../ApiManager'

export const Scores = () => {
  const [completedRounds, setCompletedRounds] = useState([])
  const [averageScoreNine, setAverageScoreNine] = useState(0)
  const [averageScoreEighteen, setAverageScoreEighteen] = useState(0)
  const [aces, setAces] = useState(0)
  const [albatrosses, setAlbatrosses] = useState(0)
  const [eagles, setEagles] = useState(0)
  const [birdies, setBirdies] = useState(0)
  const [pars, setPars] = useState(0)
  const [bogeys, setBogeys] = useState(0)
  const [doubleBogeys, setDoubleBogeys] = useState(0)
  const [tripleBogeyPlus, setTripleBogeyPlus] = useState(0)

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
              console.log(round.completedHoles.length)
              if (round.completedHoles.length === 17) {
                eighteenHoleRoundCounter += 1
                eighteenHoleScoreCounter += parseInt(round.roundScore)
                
                
              } else if (9 <= round.completedHoles.length < 18) {
                const validholes = round.completedHoles.splice(0, 9)
                validholes.map(
                  (hole) => {
                    nineHoleScoreCounter += parseInt(hole.score)
                  }
                )
                nineHoleRoundCounter += 1
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
          averageEighteenHoleScoreCopy = eighteenHoleScoreCounter / eighteenHoleRoundCounter
          setAverageScoreEighteen(averageEighteenHoleScoreCopy)
          averageNineHoleScoreCopy = nineHoleScoreCounter / nineHoleRoundCounter
          setAverageScoreNine(averageNineHoleScoreCopy)
          // const averageScoreResult = averageScoreCopy / roundCounter
          // setAverageScore(averageScoreResult)
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
      <div className="stats">
        <h3>Scores</h3>
        <p>Total Average Score (9 holes): {averageScoreNine.toFixed(2)}</p>
        <p>Total Average Score (18 holes): {averageScoreEighteen}</p>
        <p>Total Aces: {aces}</p>
        <p>Total Albatrosses: {albatrosses}</p>
        <p>Total Eagles: {eagles}</p>
        <p>Total Birdies: {birdies}</p>
        <p>Total Pars: {pars}</p>
        <p>Total Bogeys: {bogeys}</p>
        <p>Total Double Bogeys: {doubleBogeys}</p>
        <p>Total Triple+ Bogeys: {tripleBogeyPlus}</p>

      </div>
      <h3>Rounds</h3>
      <div className="completed_rounds_container">
        {
          completedRounds.map((round) => {
            if (round.favoriteCourseId != null) {
              return (
                <div key={round.id}>
                  <p>Holes completed: {round.completedHoles.length}</p>
                  <p>Score: {round.roundScore}</p>
                  <button value={round.favoriteCourseId}>View scorecard</button>
                </div>
              )
            } else {
              return (
                <div key={round.id}>
                  <p># of Holes: {round.completedHoles.length}</p>
                  <p>Score: {round.roundScore}</p>
                  <button value={round.nonFavoriteCourseId}>View scorecard</button>
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}

