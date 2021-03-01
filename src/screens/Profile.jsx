import  React, { useEffect, useState, Fragment, useContext}  from 'react';
import { AuthContext} from '../context/auth.context'

import './profile.css'


export default function Profile(){

      const auth = useContext(AuthContext)
      const userCredentials = JSON.parse(localStorage.getItem('auth')) 
      const [data, setData] = useState('')

useEffect(()=>{
      async function getUserData(){
            
            const URL = `http://127.0.0.1:5000/api/auth/user-info/${userCredentials.userId}`
            
            const data = await fetch(URL, {
                  headers: {
                        Authorization : 'Bearer ' + auth.token
                  }
            })
            const response = await data.json()
            
            setData(response)
            console.log(response)
      }
      
      getUserData()
},[])


      async function deleteUser(){
            const password = prompt('Veuillez entrer votre mot  de passe\nCette action est irreversible')
            const data = {password : password}
            console.log(data)

            const URL = `http://127.0.0.1:5000/api/auth/delete-account/${userCredentials.userId}`
            const sendedData = await fetch(URL, {
                  method : 'POST',
                  headers : {
                        Authorization : "Bearer " + auth.token
                  },
                  body : JSON.stringify(data)
            })
            const response = await sendedData.json()
            
            if(sendedData.ok){
                  alert(response.message)
                  auth.Logout()
            }
      }


     if (data){
           return(
                  <Fragment>
                        <h2 className='profile-title'>MON COMPTE</h2>
                        <div className="card">
                              <div className="profile-image-div">
                                    <img src={data.imageUrl} alt=" profil"/>
                              </div>
                              <div className="user-info">
                                          <p>Username : {data.username}</p>
                                          <p>Email : {data.email}</p>
                                          <p>Profil crée le : {data.createdAt.split('T').join(' à ').split('.000Z')}</p>
                                          <p>Profil Modifié le : {data.updatedAt.split('T').join(' à ').split('.000Z')}</p>
                              </div>
                              <div className="user-action">
                                    <button className="btn-update">Update</button>
                                    <button className="btn-delete" onClick={deleteUser}>Delete</button>
                              </div>
                        </div>
                  </Fragment>
           )
     }
     return('')
}