import  React, { useEffect, useState, Fragment, useContext}  from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext} from '../context/auth.context'

import './profile.css'
import UpdateProfilePhoto from '../components/Navigation/UpdateProfilePhoto';
import UpdateProfileEmail from '../components/Navigation/UpdateProfileEmail';
import UpdateProfileUsername from '../components/Navigation/UpdateProfileUsername';



export default function Profile(){

      const auth = useContext(AuthContext)
      const userCredentials = JSON.parse(localStorage.getItem('auth')) 
      const [data, setData] = useState('')
      const { handleSubmit, register, errors } = useForm()

      const [showUpdatePhoto, setShowUpdatePhoto] = useState(false)
      const [showUpdateEmail, setShowUpdateEmail] = useState(false)
      const [showUpdateUsername, setShowUpdateUsername] = useState(false)



      async function handleUpdateProfilePhoto(data){
            const { userId } = userCredentials
            const URL = "http://127.0.0.1:5000/api/auth/update-user/"

            const formData = new FormData()

           formData.append('image', data.image[0])
            const sendPhoto = await fetch(URL+userId, {
                  method : 'put',
                  headers : {
                        Authorization : "Bearer " + auth.token
                  },
                  body : formData
            }) 
            const response = await sendPhoto.json()
            console.log(response)
            getUserData()
            setShowUpdatePhoto(false)

      }

      async function handleUpdateProfileEmail(data){
            console.log(data)
            const { userId } = userCredentials
            const URL = "http://127.0.0.1:5000/api/auth/update-user/"

            const sendedEmail = await fetch(URL+userId, {
                  method : 'put',
                  headers : {
                        "Content-Type" : "application/json",
                        Authorization : "Bearer " + auth.token
                  },
                  body : JSON.stringify(data)
            })
            const response = await sendedEmail.json()
            console.log(response)
            getUserData()
            setShowUpdateEmail(false)
      }


      async function handleUpdateProfileUsername(data){
            const {userId} = userCredentials
            const URL = "http://127.0.0.1:5000/api/auth/update-user/"
            const sendedUsername = await fetch(URL+userId, {
                  method : 'put',
                  headers : {
                        "Content-Type" : "application/json",
                        Authorization : "Bearer " + auth.token
                  },
                  body : JSON.stringify(data)
            })
            const response = await sendedUsername.json()
            console.log(response)
            getUserData()
            setShowUpdateUsername(false)
      }


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
useEffect(()=>{
      getUserData()
},[])


      async function deleteUser(){
            const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
            const URL = `http://127.0.0.1:5000/api/auth/delete-account/${userCredentials.userId}`

            if (conf){
                  const sendedData = await fetch(URL, {
                        method : 'delete',
                        headers : {
                              Authorization : "Bearer " + auth.token
                        },
                        body : JSON.stringify(data)
                  })
                  const response = await sendedData.json()
                  console.log(response)
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
                                    <i title="Changer de nom d'utilisateur ?" class="fas fa-user white fa-3x"  onClick={()=>{
                                           setShowUpdateUsername(!showUpdateUsername)
                                           setShowUpdateEmail(false)
                                           setShowUpdatePhoto(false)
                                          }}
                                    ></i>
                                    
                                    <i title="Changer d'email ?" class="fas fa-envelope-open white fa-3x"  onClick={()=>{
                                           setShowUpdateEmail(!showUpdateEmail)
                                           setShowUpdatePhoto(false)
                                           setShowUpdateUsername(false)
                                           }}>
                                    </i>
                                    <i title="Changer de photo ?" class="fas fa-portrait white fa-3x" onClick={()=>{ 
                                          setShowUpdatePhoto(!showUpdatePhoto)
                                          setShowUpdateEmail(false)
                                          setShowUpdateUsername(false)
                                          }}>
                                    </i>
                                    <i title="Supprimer votre compte ?" class="fas fa-user-slash white fa-3x" onClick={deleteUser}></i>
                                    
                              </div>
                        </div>
                        {showUpdatePhoto &&
                              <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({required : true})}/>
                        }
                        {showUpdateEmail &&
                              <UpdateProfileEmail submit={handleSubmit(handleUpdateProfileEmail)} register={register({required : true})}/>
                        }
                        {showUpdateUsername && 
                              <UpdateProfileUsername submit={handleSubmit(handleUpdateProfileUsername)} register={register({required : true})}/>
                        }
                  </Fragment>
           )
     }
     return('')
}