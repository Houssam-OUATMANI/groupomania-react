import  React  from 'react';
import { useForm } from 'react-hook-form'

import './addPost.css'


export default function AddPost(){

       const userCredentials = JSON.parse(localStorage.getItem('auth'))
       console.log(userCredentials)
       const { handleSubmit , register , errors } = useForm()

       async function sendPost(data){
              const data2 = {...data , imageUrl : 'azeazeazezae.com', userId : userCredentials.userId}
              
              const URL = "http://127.0.0.1:5000/api/posts/add-post"

              const sendedData  = await fetch(URL, {
                     method : 'post',
                     headers : {
                            'Content-Type' : 'application/json'
                     },
                     body : JSON.stringify(data2)
              })

              const response = await sendedData.json()
              console.log(response)
       }

      return (
            <form className="add-form"  onSubmit={handleSubmit(sendPost)}>
                 <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder="Title" name="title" ref={register}/>
                 </div>
                 <div className="form-group">
                        <label htmlFor="email">Description</label>
                        <input type="text" placeholder="Description" name="detail" ref={register}/>
                 </div>
                 <div className="form-group">
                        <label htmlFor="image">Upload image</label>
                        <input type="file"  id="image"  accept="image/png, image/jpeg, image/jpg"/>
                 </div>
                 <button type="submit">Post</button>
            </form>
      )
}