import  React, {useState, useEffect }  from 'react';
//import { useForm } from 'react-hook-form'

//import { AuthContext } from '../context/auth.context'
//import { useHistory } from 'react-router';

//import './signup.css'
export default function UpdateProfilePhoto({submit, register, title}){
      //const history = useHistory()

           const [image, setImage] = useState()
           const [previewUrl, setPreviewUrl] = useState()

           function imageHandler(e){
            if(e.target.files){
                 const pickedImage = e.target.files[0]
                 setImage(pickedImage)
                 console.log("PREVIEW", pickedImage )
            }
            else{
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
                  <form className="signup-form margin"  encType="multipart/form-data" onSubmit={submit}  >
                        <div className="form-group">
                              <label htmlFor="user-pic">{ title || "Selectioner une photo de profil" }</label>
                              <input type="file" id="user-pic" name="image" accept=".jpeg, .png, .jpg, .gif" onChange={imageHandler} ref={register}/>
                              
                              { previewUrl &&
                                    <div className="image-preview">
                                          <img src={previewUrl} alt=""/>
                                    </div>
                              }
                        </div>
                        <button type="submit">Mettre à jour</button>
                  </form>
      )
}
