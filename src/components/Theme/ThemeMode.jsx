import React, {useState, useRef} from 'react'


import './ThemeMode.css'
export default function ThemeMode(){
    
    //Toogle Mode
    const [toggleMode, setToggleMode] = useState(false)

    if(toggleMode === true){
        document.body.classList.add('light-background')
        document.querySelectorAll('label').forEach(el =>{
            el.classList.add('light')
        })
        document.querySelectorAll('input').forEach(el =>{
            el.classList.add('light-input')
        })
        document.querySelectorAll('h2').forEach(el =>{
            el.classList.add('light__title')
        })
    }else if(toggleMode !== true){
        document.body.classList.remove('light-background')
        document.querySelectorAll('label').forEach(el =>{
            el.classList.remove('light')
        })
        document.querySelectorAll('input').forEach(el =>{
            el.classList.remove('light-input')
        })
        document.querySelectorAll('h2').forEach(el =>{
            el.classList.remove('light__title')
        })
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