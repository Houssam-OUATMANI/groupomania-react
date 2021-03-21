import React from 'react'

export default function UpdateProfileEmail({submit, register}){
    return(
        <form className="signup-form margin"  encType="multipart/form-data" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="add-input" type="email" name="email" id="email" placeholder="Email..." ref={register}/>              
        </div>

  </form>
    )
}