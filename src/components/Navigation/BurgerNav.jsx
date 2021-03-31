import React, { useContext } from 'react';
import ReactDOM from 'react-dom'
import './BurgerNav.css'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth.context'
import ThemeMode from '../Theme/ThemeMode';
export default function BurgerNav(){
    const auth = useContext(AuthContext)
    
    function handleLougout(){
        const out = window.confirm('Se Déconnecter ?')
        if(out){
            auth.Logout()
        }
    }
     const bgNav =    <aside>
            <nav className='burger-navigation'>
                <ul>
                    {!auth.loggedIn && (
                        <li><NavLink to='/login'>Connexion</NavLink> </li>
                    )}
                    {!auth.loggedIn && (
                        <li><NavLink to='/signup'>Inscription</NavLink></li>
                    )}
                    { auth.loggedIn && (
                        <li><NavLink to='/add-post'>Ajouter</NavLink> </li>
                    )}
                    { auth.loggedIn && (
                        <li><NavLink to='/'>Home</NavLink></li>
                    )}
                      { auth.loggedIn && (
                        <li><NavLink to='/posts'>Mes Publications</NavLink></li>
                    )}
                    { auth.loggedIn && (
                        <li><NavLink to='/profile'>Mon Profile</NavLink></li>
                    )}
                    {auth.loggedIn && (
                        <i title="Se Déconnecter" className="fas fa-sign-out-alt fa-lg" onClick={handleLougout}></i>
                    )}
                        <ThemeMode/>
                </ul>
            </nav>
        </aside>
        return ReactDOM.createPortal(bgNav, document.getElementById('burger-nav'))
}