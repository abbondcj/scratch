import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

export const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-transparent">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#scratchNav" aria-controls="scratchNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="scratchNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="play">Play</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="courses">Courses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="scores">Scores</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="profile">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="login" onClick={() => {localStorage.removeItem("scratch_user_id")}}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

