import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from '../nav/Nav'
import './Dashboard.css'

export const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <>
      <Nav />
      <h3>Welcome to Scratch</h3>
      <div className="scratch_intro">
          <p>
            A new course finder
          </p>
          <p>
            An electronic scorecard
          </p>
          <p>
            A way to improve your golf game!
          </p>
      </div>

      <div className="scratch_how">
        <h3>How it works</h3>
          <p>
            Select 'Play' to start a new round
          </p>
          <p>
            Add new courses to your favorites pst 
          </p>
          <p>
            Enter in your scorecard results
          </p>
          <p>
            Submit the round and track your stats!
          </p>
          <button id="dashboard_play" onClick={() => {navigate("/play")}}>Go play!</button>
      </div>  
    </>
  )
}

