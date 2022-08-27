import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Scorecard = () => {
  const navigate = useNavigate()
  const [currentCourse, setCurrentCourse] = useState(localStorage.getItem("current_course_playing"))
  const [currentHole, setCurrentHole] = useState(1)
  const [currentHolePar, setCurrentHolePar] = useState(3)
  const [currentHoleDistance, setCurrentHoleDistance] = useState(200)
  const [currentHoleScore, setCurrentHoleScore] = useState(0)
  const [currentRoundScore, setCurrentRoundScore] = useState(0)
  const [currentTeeShot, setCurrentTeeShot] = useState()
  const [currentGir, setCurrentGir] = useState(false)
  
  
  


  return (
    <>
      <h3>Scorecard</h3>
      <div>
          <p>Hole #{currentHole}</p>
          <label>Yards:</label>
          <input type="number" placeholder={currentHoleDistance} value={currentHoleDistance} onChange={(e) => {setCurrentHoleDistance(e.target.value)}}></input>
          <label>Par:</label>
          <input type="number" placeholder={currentHolePar} value={currentHolePar} onChange={(e) => {setCurrentHolePar(e.target.value)}}></input>
          <div className='tee_shot'>
            <p>Tee Shot</p>
            <div>
              <label>Long</label>
              <input type="radio" name="tee_shot_selector" value="Long" onChange={
                    (e) => {
                      setCurrentTeeShot(e.target.value)
                    }
                  }></input>
            </div>
            <div>
              <label>Left</label>
              <input type="radio" name="tee_shot_selector" value="Left" onChange={
                (e) => {
                  setCurrentTeeShot(e.target.value)
                }
              }></input>
              {
                currentHolePar < 4 ? 
                <>
                  <label>Green</label>
                  <input type="radio"  name="tee_shot_selector" value="Green" onChange={
                    (e) => {
                      setCurrentTeeShot(e.target.value)
                    }
                  }>
                  </input> 
                </>
                : 
                <>
                  <label>Fairway</label>
                  <input type="radio"  name="tee_shot_selector" value="Fairway" onChange={
                    (e) => {
                      setCurrentTeeShot(e.target.value)
                    }
                  }>
                  </input> 
                </>
              }
              <label>Right</label>
              <input type="radio" name="tee_shot_selector" value="Right" onChange={
                    (e) => {
                      setCurrentTeeShot(e.target.value)
                    }
                  }></input>
            </div>
            <div>
              <label>Short</label>
              <input type="radio" name="tee_shot_selector" value="Short" onChange={
                    (e) => {
                      setCurrentTeeShot(e.target.value)
                    }
                  }></input>
            </div>
          </div>
          <div className="hole_score_results">
              <label>GIR</label>
              <input type="checkbox" onClick={(e) => {
                if (e.target.checked) {
                  setCurrentGir(true)
                } else {
                  setCurrentGir(false)
                }
              }}></input>
              <label>Strokes</label>
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

              }}>Previous Hole</button> : ``
            }
            {
              currentHole < 18 ? <button onClick={() => {
                let currentHoleCopy = currentHole
                currentHoleCopy += 1
                setCurrentHole(currentHoleCopy)
              }}>Next Hole</button> : ``
            }
            {
              currentHole === 18 ? <button onClick={() => {
                console.log("Round Finished")
              }}>Finish Round</button> : ``
            }

          </div>
          <button onClick={
            () => {
              navigate("/play")
            }
          }>Exit Round</button>
      </div>
    </>
  )
}

