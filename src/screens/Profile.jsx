import  React, { useEffect, useState, Fragment, useContext}  from 'react';
import { useForm } from 'react-hook-form'
import { AuthContext} from '../context/auth.context'

import './profile.css'
import UpdateProfilePhoto from '../components/Navigation/UpdateProfilePhoto';
import UpdateProfileEmail from '../components/Navigation/UpdateProfileEmail';
import UpdateProfileUsername from '../components/Navigation/UpdateProfileUsername';

const USER_INFO_URL = "http://127.0.0.1:5000/api/auth/user-info"
const UPDATE_USER_URL = "http://127.0.0.1:5000/api/auth/update-user/"
const DELETE_ACCOUNT_URL = "http://127.0.0.1:5000/api/auth/delete-account"
export default function Profile(){

      const auth = useContext(AuthContext)
      const userCredentials = JSON.parse(localStorage.getItem('auth')) 
      const [data, setData] = useState('')
      const { handleSubmit, register} = useForm()

      const [showUpdatePhoto, setShowUpdatePhoto] = useState(false)
      const [showUpdateEmail, setShowUpdateEmail] = useState(false)
      const [showUpdateUsername, setShowUpdateUsername] = useState(false)



      async function handleUpdateProfilePhoto(data){
            const { userId } = userCredentials
           

            const formData = new FormData()

           formData.append('image', data.image[0])
            const sendPhoto = await fetch(UPDATE_USER_URL+userId, {
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

            const sendedEmail = await fetch(UPDATE_USER_URL+userId, {
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
            const sendedUsername = await fetch(UPDATE_USER_URL+userId, {
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
            
            const URL = `${USER_INFO_URL}/${userCredentials.userId}`
            
            const data = await fetch(URL, {
                  headers: {
                        Authorization : 'Bearer ' + auth.token
                  }
            })
            const response = await data.json()
            
            setData(response)
      }
useEffect(()=>{
      getUserData()
},[])


      async function deleteUser(){
            const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
            const URL = `${DELETE_ACCOUNT_URL}/${userCredentials.userId}`

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
                                    <i title="Changer de nom d'utilisateur ?" className="fas fa-user white fa-3x"  onClick={()=>{
                                           setShowUpdateUsername(!showUpdateUsername)
                                           setShowUpdateEmail(false)
                                           setShowUpdatePhoto(false)
                                          }}
                                    ></i>
                                    
                                    <i title="Changer d'email ?" className="fas fa-envelope-open white fa-3x"  onClick={()=>{
                                           setShowUpdateEmail(!showUpdateEmail)
                                           setShowUpdatePhoto(false)
                                           setShowUpdateUsername(false)
                                           }}>
                                    </i>
                                    <i title="Changer de photo ?" className="fas fa-portrait white fa-3x" onClick={()=>{ 
                                          setShowUpdatePhoto(!showUpdatePhoto)
                                          setShowUpdateEmail(false)
                                          setShowUpdateUsername(false)
                                          }}>
                                    </i>
                                    <i title="Supprimer votre compte ?" className="fas fa-user-slash white fa-3x" onClick={deleteUser}></i>
                                    
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