import React, {useState} from 'react'


import './ThemeMode.css'
export default function ThemeMode(){
    
    //Toogle Mode
    const [toggleMode, setToggleMode] = useState(false)

    if(toggleMode === true){
        document.body.classList.add('light-background')
    }else if(toggleMode !== true){
        document.body.classList.remove('light-background')
    }
    
    return(
        <div className="theme-container">
                <i
                    onClick={()=> setToggleMode(!toggleMode)}
                    className={toggleMode === true ? "far fa-clone fa-2x  " : "fas fa-clone fa-2x  "}>
                 </i>
                
        </div>
    )
}