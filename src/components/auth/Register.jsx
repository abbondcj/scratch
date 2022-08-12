import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { states, users } from '../ApiManager';
import './Register.css'

export const Register = () => {
    const [activePage, setPage] = useState(1);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [username, setUsername] = useState("")
    const [roundsPerMonth, setRoundsPerMonth] = useState("")
    const [averageScore, setAverageScore] = useState("")
    const [handicap, setHandicap] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [homeCourse, setHomeCourse] = useState("")
    const [averageScoreGoal, setAverageScoreGoal] = useState("")
    const [handicapGoal, setHandicapGoal] = useState("")
    const [stateList, setStateList] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(states)
            .then((res) => res.json())
            .then((data) => {
                setStateList(data)
            })
        }, 
        []
    )

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


    const itemExistsCheck = (type, value) => {
        return (
            fetch (users + `/?${type}=${value}`)
            .then((res) => res.json())
            .then(user => user.length ? user[0] : false)
        )
    }

    const signUp = () => {
        const newUser = {
            firstName: firstName.trim(),
            lastName : lastName.trim(),
            username : username.trim(),
            email : email.trim(),
            password : password.trim(),
            city : city.trim(),
            state : state,
            homeCourse : homeCourse.trim(),
            roundsPerMonth : roundsPerMonth,
            averageScore : averageScore,
            handicap : handicap,
            averageScoreGoal : averageScoreGoal,
            handicapGoal : handicapGoal,
            createDate: new Date().toDateString()
        }
        fetch(users, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)
          }
        )
        .then((res) => res.json())
        .then((newUser) => {
            localStorage.setItem("scratch_user_id", newUser.id)
            navigate("/")
        })
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
                                itemExistsCheck("email", email)
                                .then(
                                    (emailExists) => {
                                        if (!emailExists) {
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
                                        } else {
                                            window.alert(`${email} is already associated with profile`)
                                            setEmail("")
                                            setPassword("")
                                            setPasswordConfirm("")
                                        }
                                    }
                                )
                            }
                        }>
                            Next
                        </button>
                    </div>
                    <button 
                        className='cancel_register' 
                        onClick={
                            () => {
                                navigate("/login")
                            }
                    }>
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
                                itemExistsCheck("username", username)
                                .then(
                                    (usernameExists) => {
                                        if (!usernameExists) {
                                            if (firstName && lastName && username) {
                                                pageSwitch(true)
                                            } else {
                                                window.alert("Please enter in all information")
                                            }
                                        } else {
                                            window.alert(`${username} is already associated with profile`)
                                            setUsername("")
                                        }
                                    }
                                )
                            }
                        }>
                            Next
                        </button>
                    </div>
                    <button 
                        className='cancel_register' 
                        onClick={
                            () => {
                                navigate("/login")
                                }
                    }>
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
                    <label>State</label>
                    <select className='register_state_select' onChange={
                        (e) => {
                            let stateCopy = state
                            stateCopy = e.target.value
                            setState(stateCopy)
                        }
                    }>
                        {state.length > 0 ? <></> : <option value="">Choose a state</option>}
                        {
                            stateList.map((state) => {
                                return (
                                    <option key={state} value={state}>{state}</option>
                                )
                            })
                        }
                    </select>
                    <label>City</label>
                    <input 
                    autoFocus
                    required
                        onChange={
                            (e) => {
                                let cityCopy = city
                                cityCopy = e.target.value
                                setCity(cityCopy)
                            }
                        }
                        value={city} 
                        type='text' 
                        placeholder='City' 
                    />
                    <label>Home course</label>
                    <input
                    required
                    onChange={
                        (e) => {
                            let homeCourseCopy = homeCourse
                            homeCourseCopy = e.target.value
                            setHomeCourse(homeCourseCopy)
                        }
                    }
                    value={homeCourse} 
                    type='text' 
                    placeholder='Home course' 
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
                    <button 
                        className='cancel_register' 
                        onClick={
                            () => {
                                navigate("/login")
                            }
                    }>
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
                    <input 
                        onChange={
                            (e) => {
                                let roundsPerMonthCopy = roundsPerMonth
                                roundsPerMonthCopy = e.target.value
                                if (isNaN(roundsPerMonthCopy)) {
                                    window.alert("Must enter number only")
                                    setRoundsPerMonth(0)
                                } else {
                                    setRoundsPerMonth(roundsPerMonthCopy)
                                }
                            }
                        }
                        value={roundsPerMonth}
                        type='number' 
                        placeholder='Rounds per month' 
                    />
                    <label>Average score</label>
                    <input 
                        onChange={
                            (e) => {
                                let averageScoreCopy = averageScore
                                averageScoreCopy = e.target.value
                                if (isNaN(averageScoreCopy)) {
                                    window.alert("Must enter number only")
                                    setAverageScore(0)
                                } else {
                                    setAverageScore(averageScoreCopy)
                                }
                            }
                        }
                        value={averageScore}
                        type='number' 
                        placeholder='Home course' 
                    />
                    <label>Current handicap</label>
                    <input 
                        onChange={
                            (e) => {
                                let handicapCopy = handicap
                                handicapCopy = e.target.value
                                console.log(handicapCopy)
                                if (isNaN(handicapCopy)) {
                                    window.alert("Must enter number only")
                                    setHandicap(0)
                                } else {
                                    setHandicap(handicapCopy)
                                }
                            }
                        }
                        value={handicap}
                        type='number' 
                        placeholder='Handicap' 
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
                    <button
                    className='cancel_register' 
                    onClick={
                        () => {
                            navigate("/login")
                        }
                    }>
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
                    <input 
                        onChange={
                            (e) => {
                                let averageScoreGoalCopy = averageScoreGoal
                                averageScoreGoalCopy = e.target.value
                                if (isNaN(averageScoreGoalCopy)) {
                                    window.alert("Must enter number")
                                } else {
                                    setAverageScoreGoal(averageScoreGoalCopy)
                                }
                            }
                        }
                        value={averageScoreGoal}
                        type='int' 
                        placeholder='Average score goal' 
                    />
                    <label>Handicap goal</label>
                    <input 
                        onChange={
                            (e) => {
                                let handicapGoalCopy = handicapGoal
                                handicapGoalCopy = e.target.value
                                if (isNaN(handicapGoalCopy)) {
                                    window.alert("Must enter number")
                                } else {
                                    setHandicapGoal(handicapGoalCopy)
                                }
                            }
                        }
                        value={handicapGoal}
                        type='int' 
                        placeholder='Handicap goal' 
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
                                signUp()
                            }
                        }>
                            Sign up
                        </button>
                    </div>
                    <button 
                        className='cancel_register' 
                        onClick={
                            () => {
                                navigate("/login")
                            }
                    }>
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

