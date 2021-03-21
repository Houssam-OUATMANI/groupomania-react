import  React, {useState, useEffect}  from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router';

import './signup.css'

const SIGNUP_URL = "http://127.0.0.1:5000/api/auth/signup"  
export default function Signup(){

      // useHistory hook
      const history = useHistory()

      // from hook
      const { handleSubmit , register , errors } = useForm()

     async function handleSignup(data){
            console.log(data.image[0])     
      const formData = new FormData()

           formData.append('username', data.username)
           formData.append('image', data.image[0])
           formData.append('email', data.email)
           formData.append('password', data.password)

           //console.log(formData)
           try{
            const sendedData = await fetch(SIGNUP_URL, {
                       method : 'post',
                       body : formData
                 })
            const response = await sendedData.json()
                  if (!sendedData.ok){
                    alert(response.message.errors[0].message)
              }else{
                 alert(`${response.message} \nVeuillez vous Connecter`)
                 history.push('/login')
            }
     
           }catch(err){
                  console.log(err) 
           }
           }

           const [image, setImage] = useState()
           const [previewUrl, setPreviewUrl] = useState()

           function imageHandler(e){
            if(e.target.files){
                 const pickedImage = e.target.files[0]
                 setImage(pickedImage)
            }
            else{
                  return
            }
           }

           useEffect(()=>{
                 if(image){
                              const imageReader = new FileReader()
                              imageReader.onload = ()=>{
                                    setPreviewUrl(imageReader.result)
                              }
                              imageReader.readAsDataURL(image)
                 }else{
                       return
                 }
           },[image])


      return(
                  <form className="signup-form"  encType="multipart/form-data" onSubmit={handleSubmit(handleSignup)}  >
                        <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input  type="text" placeholder="username ..." name="username" ref={register({required :true, minLength : 5, maxLength: 25}) }/>
                              {errors.username && <code>Username obligatoire<br/>Min : 5 caracteres && Max : 25 </code>}
                        </div>

                        <div className="form-group">
                              <label htmlFor="user-pic">Selectioner une photo de profil</label>
                              <input type="file" id="user-pic" name="image" accept=".jpeg, .png, .jpg, .gif" onChange={imageHandler} ref={register({required : true})}/>
                              
                              { previewUrl &&
                                    <div className="image-preview">
                                          <img src={previewUrl} alt=""/>
                                    </div>
                              }
                              {errors.image && <code>Image Obligatoire</code>}
                        </div>

                        <div className="form-group">
                              <label htmlFor="username">Email</label>
                              <input type="email" placeholder="email..." name="email" ref={register({required :true}) }/>
                              {errors.email && <code>Email obligatoire</code>}
                        </div>
                        <div className="form-group">
                              <label htmlFor="password">Mot de passe</label>
                              <input type="password" placeholder="password ... " name="password" ref={register({required :true})}/>
                              {errors.password && <code>Mot de Passe obligatoire</code>}
                        </div>
                        <button type="submit" >Inscription</button>
                  </form>
      )
}
