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
    },[]
  )
  return (
    <>
      <Nav />
      <h3>Profile</h3>
      <div className="user_profile">
        <p><b>Name:</b></p>
        <p>{user.firstName} {user.lastName}</p>
        <p><b>Email:</b></p>
        <p>{user.email}</p>
        <p><b>Location:</b></p>
        <p>{user.city}, {user.state}</p>
        <p><b>Home Course:</b></p>
        <p>{user.homeCourse}</p>
        <p><b>Create Date:</b></p>
        <p>{user.createDate}</p>
      </div>
    </>
  )
}

