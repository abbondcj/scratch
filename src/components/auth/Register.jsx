import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'

export const Register = () => {
    const [activePage, setPage] = useState(1);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [username, setUsername] = useState("")
    const [monthlyRounds, setMonthlyRounds] = useState(0)
    const [averageScore, setAverageScore] = useState(0)
    const [handicap, setHandicap] = useState(0)
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [homeCourse, setHomeCourse] = useState("")
    const [averageScoreGoal, setAverageScoreGoal] = useState(0)
    const [handicapGoal, setHandicapGoal] = useState(0)

    const navigate = useNavigate()

    const pageSwitch = (isNext) => {
        if (isNext) {
            let currentPage = activePage
            currentPage += 1
            setPage(currentPage)
        } else {
            let currentPage = activePage
            currentPage -= 1
            setPage(currentPage)
        }
    }
    const signUp = () => {
        console.log("New user signed up")
    }

    const pageOne = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>Email</label>
                    <input 
                        autoFocus
                        required
                        value={email}
                        onChange={
                            (e) => {
                                    let emailCopy = email
                                    emailCopy = e.target.value
                                    setEmail(emailCopy)
                                }
                            }   
                        type='email' 
                        placeholder='Email' 
                    />
                    <label>Password</label>
                    <input 
                        required
                        value={password}
                        onChange={
                            (e) => {
                                    let passwordCopy = password
                                    passwordCopy = e.target.value
                                    setPassword(passwordCopy)
                                }
                            }
                        type='password' 
                        placeholder='Password' 
                    />
                    <label>Confirm password</label>
                    <input 
                        required
                        value={passwordConfirm}
                        onChange={
                            (e) => {
                                    let passwordConfirmCopy = passwordConfirm
                                    passwordConfirmCopy = e.target.value
                                    setPasswordConfirm(passwordConfirmCopy)
                                }
                            }
                        type='password' 
                        placeholder='Confirm password' 
                    />
                    <div className='register_buttons'>
                        <button onClick={
                            () => {
                                if (email && password && passwordConfirm) {
                                    if (email.match("@") && email.match(".com" || ".net" || ".mail")) {
                                        if (password === passwordConfirm) {
                                            pageSwitch(true)
                                        } else {
                                            window.alert("Passwords do not match")
                                            setPassword("")
                                            setPasswordConfirm("")
                                        }
                                    } else {
                                        window.alert("Please enter a valid email")
                                        setEmail("")
                                        setPassword("")
                                        setPasswordConfirm("")
                                    }
                                } else {
                                    window.alert("Please enter in all information")
                                }
                            }
                        }>
                            Next
                        </button>
                    </div>
                    <button className='cancel_register' onClick={() => {navigate("/login")}}>
                        Cancel
                    </button>
                </div>
            </>
        )
    }
    const pageTwo = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>First name</label>
                    <input 
                        autoFocus
                        required
                        value={firstName} 
                        onChange={
                            (e) => {
                                let firstNameCopy = firstName
                                firstNameCopy = e.target.value
                                setFirstName(firstNameCopy)
                            }
                        }
                        type='text' 
                        placeholder='First name' 
                    />
                    <label>Last name</label>
                    <input 
                        required
                        onChange={
                            (e) => {
                                let lastNameCopy = lastName
                                lastNameCopy = e.target.value
                                setLastName(lastNameCopy)
                            }
                        }
                        value={lastName} 
                        type='text' 
                        placeholder='Last name' 
                    />
                    <label>Username</label>
                    <input 
                        required
                        onChange={
                            (e) => {
                                let usernameCopy = username
                                usernameCopy = e.target.value
                                setUsername(usernameCopy)
                            }
                        }
                        value={username} 
                        type='text' 
                        placeholder='Username' 
                    />
                    <div className='register_buttons'>
                        <button onClick={
                            () => {
                                pageSwitch(false)
                            }
                        }>
                            Previous
                        </button>
                        <button onClick={
                            () => {
                                if (firstName && lastName && username) {
                                    pageSwitch(true)
                                } else {
                                    window.alert("Please enter in all information")
                                }
                            }
                        }>
                            Next
                        </button>
                    </div>
                    <button className='cancel_register' onClick={() => {navigate("/login")}}>
                        Cancel
                    </button>
                </div>
            </>
        )
    }
    const pageThree = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>City</label>
                    <input value={city} type='text' placeholder='City' />
                    <label>State</label>
                    <input value={state} type='text' placeholder='State' />
                    <label>Home course</label>
                    <input value={homeCourse} type='text' placeholder='Home course' />
                    <div className='register_buttons'>
                        <button onClick={
                            () => {
                                pageSwitch(false)
                            }
                        }>
                            Previous
                        </button>
                        <button onClick={
                            () => {
                                signUp()
                            }
                        }>
                            Sign up & finish later
                        </button>
                        <button onClick={
                            () => {
                                pageSwitch(true)
                            }
                        }>
                            Next
                        </button>
                    </div>
                    <button className='cancel_register' onClick={() => {navigate("/login")}}>
                        Cancel
                    </button>
                </div>
            </>
        )
    }

    const pageFour = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>Current rounds played per month</label>
                    <input type='number' placeholder='Rounds per month' />
                    <label>Average score</label>
                    <input type='number' placeholder='Home course' />
                    <label>Current handicap</label>
                    <input type='number' placeholder='Handicap' />
                    <div className='register_buttons'>
                        <button onClick={
                            () => {
                                pageSwitch(false)
                            }
                        }>
                            Previous
                        </button>
                        <button onClick={
                            () => {
                                signUp()
                            }
                        }>
                            Sign up & finish later
                        </button>
                        <button onClick={
                            () => {
                                pageSwitch(true)
                                }
                        }>
                            Next
                        </button>
                    </div>
                    <button className='cancel_register' onClick={() => {navigate("/login")}}>
                        Cancel
                    </button>
                </div>
            </>
        )
    }

    const pageFive = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>Average score goal</label>
                    <input type='number' placeholder='Average score goal' />
                    <label>Handicap goal</label>
                    <input type='number' placeholder='Handicap goal' />
                    <div className='register_buttons'>
                        <button onClick={
                            () => {
                                pageSwitch(false)
                            }
                        }>
                            Previous
                        </button>
                        <button onClick={
                            () => {
                                signUp()
                            }
                        }>
                            Sign up
                        </button>
                    </div>
                    <button className='cancel_register' onClick={() => {navigate("/login")}}>
                        Cancel
                    </button>
                </div>
            </>
        )
    }
    
    switch (activePage) {
        case 1:
            return pageOne()
        case 2:
            return pageTwo()
        case 3: 
            return pageThree()
        case 4:
            return pageFour()
        case 5:
            return pageFive()
        default:
            return
    }
}

