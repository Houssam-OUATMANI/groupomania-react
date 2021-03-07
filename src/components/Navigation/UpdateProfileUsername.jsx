import React from 'react'

export default function UpdateProfileUsername({submit, register}){
    return(
        <form className="signup-form" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" placeholder="username..." ref={register}/>              
        </div>
        <button type="submit">Mettre à jour</button>
  </form>
    )
}