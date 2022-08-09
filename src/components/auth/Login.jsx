import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../ApiManager'
import './Login.css'

export const Login = () => {  
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const existingUserCheck = (username) => {
        return (
            fetch (users + `/?username=${username}`)
            .then((res) => res.json())
            .then(user => user.length ? user[0] : false)
        )
    }
    const handleLogin = (username, password) => {
         if (username.length > 0 && password.length > 0) {
            existingUserCheck(username)
            .then((userExists) => {
                if (userExists) {
                    if (userExists.password === password) {
                        localStorage.setItem("scratch_user_id", userExists.id)
                        navigate("/home")
                    } else {
                        window.alert("Incorrect password")
                        setPassword("")
                    }
                } else {
                    window.alert("User does not exists")
                }
            })
         } else {
            window.alert("Must enter information to sign in")
         }
        
    }

    return (
        <>
            <div className='login_card'>
                <h2>Login</h2>
                <label className='login_label'>Username</label>
                <input onChange={
                        (e) => {
                            let usernameCopy = username
                            usernameCopy = e.target.value
                            setUsername(usernameCopy)
                        }
                    }
                    value={username}   
                    type='text' className='login_input' placeholder='username' />
                <label className='login_label'>Password</label>
                <input onChange={
                    (e) => {
                        let passwordCopy = password
                            passwordCopy = e.target.value
                            setPassword(passwordCopy)
                    }
                }
                    value={password}
                    type='password' className='login_input' placeholder='password' />
                <div className='login_buttons'>
                    <button onClick={
                        () => {
                            handleLogin(username,password)
                        }
                    }>
                        Login
                    </button>
                    <button onClick={
                        () => {
                            navigate("/register")
                        }
                    }>
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}
            