import  React, { useEffect, useState, useContext }  from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router';

import {AuthContext} from '../context/auth.context'

import './addPost.css'

const ADD_POST_URL = "http://127.0.0.1:5000/api/posts/add-post"
const HOME = "/"

export default function AddPost(){

      const history = useHistory()
      const auth = useContext(AuthContext)
      const { handleSubmit , register , errors } = useForm()
      
      const userCredentials = JSON.parse(localStorage.getItem('auth'))

       async function sendPost(data){

            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('detail', data.detail)
            formData.append('userId' , userCredentials.userId)
            formData.append('image', data.image[0])              

              const sendedData  = await fetch(ADD_POST_URL, {
                     method : 'post',
                     body : formData,
                     headers : {
                           Authorization : 'Bearer ' + auth.token
                     }
              })
              await sendedData.json()
              if (sendedData.ok){
                  history.push(HOME)
              }
       }

       const [image, setImage] = useState()
       const [previewUrl, setPreviewUrl] = useState()

       function imageHandler(e){
        if(e.target.files){
             const pickedImage = e.target.files[0]
             setImage(pickedImage)
             console.log("PREVIEW", pickedImage )
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


      return (
            <form className="add-form"  onSubmit={handleSubmit(sendPost)}>
                 <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input className="add-input" type="text" placeholder="Title" name="title" ref={register} />
                 </div>
                 <div className="form-group">
                        <label htmlFor="email">Description</label>
                        <input className="add-input" type="text" placeholder="Description" name="detail" ref={register}/>
                 </div>
                 <div className="form-group">
                        <label htmlFor="image">Image/Gif</label>
                        <input type="file"  id="image" name="image" accept=".png, .jpeg, .jpg, .gif" onChange={imageHandler} ref={register({required :true})}/>
                        { previewUrl &&
                                    <div className="image-preview">
                                          <img src={previewUrl} alt=""/>
                                    </div>
                        }
                       {errors.image && <code>Image Obligatoire</code>}
                 </div>
                 <button type="submit">Publier</button>
            </form>
      )
}