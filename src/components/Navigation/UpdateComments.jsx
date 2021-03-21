import React from 'react'

import './UpdateComments.css'

export default function UpdateComments({ onSubmit , onChange, value }){

      return(
           <form className="update-form" onSubmit={onSubmit}>
                  <input type="text" placeholder="Mettre a jour 🙂" onChange={onChange} value={value}/>
           </form>
      )
}