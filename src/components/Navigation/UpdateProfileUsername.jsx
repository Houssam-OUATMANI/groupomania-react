import React from 'react'
import './UpdateProfile.css'
export default function UpdateProfileUsername({submit, register, title}){
    return(
        <form className="signup-form margin" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="username"> { title || "Username"}</label>
              <input className="add-input" type="text" name="username" id="username" placeholder={ title === undefined ?  'username...' : title } ref={register}/>              
        </div>
  </form>
    )
}