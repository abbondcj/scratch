import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { users } from '../ApiManager'
import { Nav } from '../nav/Nav'

export const Profile = () => {
  const [user, setUser] = useState({})

  useEffect(
    () => {
      fetch(users + `/${localStorage.getItem("scratch_user_id")}`)
      .then(res => res.json())
      .then(
        (data) => {
          setUser(data)
        }
      )
    }
  )
  return (
    <>
      <Nav />
      <h3>Profile</h3>
      <div className="user_profile">
        <p>{user.firstName} {user.lastName}</p>
        <p></p>
        <p>{user.email}</p>
        <p>{user.city}, {user.state}</p>
        <p>Home Course:</p>
        <p>{user.homeCourse}</p>
        <p>Handicap:</p>
        <p>{user.handicap}</p>
        <p>Create Date:</p>
        <p>{user.createDate}</p>
      </div>
    </>
  )
}

