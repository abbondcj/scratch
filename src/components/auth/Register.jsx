import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'

export const Register = () => {
    const [activePage, setPage] = useState(1);
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

    const PageOne = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>Email</label>
                    <input type='email' placeholder='Email' />
                    <label>Password</label>
                    <input type='password' placeholder='Password' />
                    <label>Confirm password</label>
                    <input type='password' placeholder='Confirm password' />
                    <div className='register_buttons'>
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
    const PageTwo = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>First name</label>
                    <input type='text' placeholder='First name' />
                    <label>Last name</label>
                    <input type='text' placeholder='Last name' />
                    <label>Username</label>
                    <input type='text' placeholder='Username' />
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
    const PageThree = () => {
        return (
            <>
                <div className='register_card'>
                    <h3>Profile Sign Up</h3>
                    <label>City</label>
                    <input type='text' placeholder='City' />
                    <label>State</label>
                    <input type='text' placeholder='State' />
                    <label>Home course</label>
                    <input type='text' placeholder='Home course' />
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

    const PageFour = () => {
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

    const PageFive = () => {
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
            return <PageOne />
        case 2:
            return <PageTwo />
        case 3: 
            return <PageThree />
        case 4:
            return <PageFour />
        case 5:
            return <PageFive />
        default:
            return <PageOne />
    }
}

