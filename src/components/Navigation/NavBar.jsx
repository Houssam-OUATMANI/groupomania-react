import React, {Fragment, useContext, useState} from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth.context'
import './NavBar.css'
import Logo from '../../assets/icon-left-font-monochrome-black.svg'
import BurgerNav from './BurgerNav'
import ThemeMode from '../Theme/ThemeMode';


export default function NavBar(){

    const adminCredantials =  localStorage.getItem('admin') || undefined 


    const auth = useContext(AuthContext)
   //const logout = ()=>  localStorage.removeItem('auth')
    const [ burgerNav, setBurgerNav ] = useState(false) 

    function handleLougout(){
        const out = window.confirm('Se Déconnecter ?')
        if(out){
            auth.Logout()
        }
    }
    return(
        <Fragment>

        {burgerNav &&
            <BurgerNav/>
        }

        <div className='navbar__container'>
            <i className="fas fa-bars fa-3x" onClick={()=>{setBurgerNav(!burgerNav)}}></i>

            <h1 className ="logo"><NavLink to="/"> <img src={Logo} width="250"alt="Logo groupomania social network"/></NavLink> </h1>
            <nav className='navigation'>
                <ul>
                    {!auth.loggedIn && (
                        <li><NavLink to='/login'>Connexion</NavLink> </li>
                    )}
                    {!auth.loggedIn && (
                        <li><NavLink to='/signup'>Inscription</NavLink></li>
                    )}
                    {
                     !auth.loggedIn &&(
                        <li><NavLink to='/admin'>Admin</NavLink></li>
                     )
                    }
                    { auth.loggedIn  && !adminCredantials && (
                        <li id="add"><NavLink to='/add-post'>Ajouter</NavLink> </li>
                    )}
                    { auth.loggedIn  && !adminCredantials && (
                        <li><NavLink to='/'>Home</NavLink></li>
                    )}
                      { auth.loggedIn  && (
                        <li><NavLink to='/posts'>{adminCredantials !== undefined ? "Toutes les publications" : "Mes Publications" }</NavLink></li>
                    )}
                    { auth.loggedIn && !adminCredantials &&  (
                        <li id="profil"><NavLink to='/profile'>Mon Profile</NavLink></li>
                    )}
                    {auth.loggedIn && (
                        <i className="fas fa-sign-out-alt fa-lg" onClick={handleLougout}></i>
                    )}
                    <ThemeMode/>
                </ul>
            </nav>
        </div>
        </Fragment>
    )
}

