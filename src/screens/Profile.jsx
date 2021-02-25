import  React, { useEffect, useState, Fragment}  from 'react';


import './profile.css'


export default function Profile(){

      const userCredentials = JSON.parse(localStorage.getItem('auth')) 
const [data, setData] = useState('')

useEffect(()=>{
      async function getUserData(){
            
            const URL = `http://127.0.0.1:5000/api/auth/user-info/${userCredentials.userId}`
            
            const data = await fetch(URL)
            const response = await data.json()
            
            setData(response)
            console.log(response)
      }
      
      getUserData()
},[])


     if (data){
           return(
                  <Fragment>
                        <h2 className='profile-title'>INFO UTLISATEUR</h2>
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
                                    <button className="btn-delete">Delete</button>
                              </div>
                        </div>
                  </Fragment>
           )
     }
     return('')
}