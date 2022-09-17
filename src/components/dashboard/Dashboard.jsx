import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from '../nav/Nav'

export const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <>
      <Nav />
      <h3>Welcome to Scratch</h3>
      <div className="scratch_intro">
        <p>What is Scratch?</p>
        <ul>
          <li>
            A new course finder
          </li>
          <li>
            An electronic scorecard
          </li>
          <li>
            A way to improve your golf game!
          </li>
        </ul>
      </div>

      <div className="scratch_how">
        <p>How it works</p>
        <ul>
          <li>
            Select 'Play' to start a new round
          </li>
          <li>
            Add new courses to your favorites list 
          </li>
          <li>
            Enter in your scorecard results
          </li>
          <li>
            Submit the round and track your stats!
          </li>
          <button onClick={() => {navigate("/play")}}>Go play!</button>
        </ul>
      </div>  
    </>
  )
}

