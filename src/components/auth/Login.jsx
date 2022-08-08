import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export const Login = () => {  
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
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
                    type='text' className='login_input' placeholder='username' />
                <label className='login_label'>Password</label>
                <input onChange={
                    (e) => {
                        let passwordCopy = password
                            passwordCopy = e.target.value
                            setPassword(passwordCopy)
                    }
                }
                    type='password' className='login_input' placeholder='password' />
                <div className='login_buttons'>
                    <button>Login</button>
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
            