import  React  from 'react';
import { useForm } from 'react-hook-form'

import './addPost.css'


export default function AddPost(){
      return (
            <form className="add-form" >
                 <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder="Title"/>
                 </div>
                 <div className="form-group">
                        <label htmlFor="email">Description</label>
                        <input type="text" placeholder="Description"/>
                 </div>
                 <div className="form-group">
                        <label htmlFor="image">Upload image</label>
                        <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg"/>
                 </div>
                 <button type="submit">Post</button>
            </form>
      )
}