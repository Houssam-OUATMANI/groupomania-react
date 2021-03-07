import React, {useState} from 'react'

import './UpdateComments.css'

export default function UpdateComments({ onSubmit , onChange, value }){

      return(
           <form className="update-form" onSubmit={onSubmit}>
                  <input type="text" placeholder="mise a joue commentaire" onChange={onChange} value={value}/>
                  <div className="comment__btn-container">
                        <button className="btn-s" type="submit">Maj</button>
                        <button className="btn-r" type="reset">Effacer</button>
                  </div>
           </form>
      )
}