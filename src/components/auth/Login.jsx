import React, { useState } from 'react'
import './Login.css'

export const Login = () => {  
    const user = localStorage.getItem("scratch_user_id")  
    return (
        <>
            <h2>Login</h2>
            <div className='login_card'>
                <label className='login_label'>username</label>
                <input type='text' className='login_input' placeholder='username' />
                <label className='login_label'>password</label>
                <input type='password' className='login_input' placeholder='password' />
                <div className='login_buttons'>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>

        </>
    )
}
            