import  React, { useContext}  from 'react';
import { useForm } from 'react-hook-form'

import { AuthContext } from '../context/auth.context'

import './signup.css'
export default function Signup(){

      const { handleSubmit , register , errors } = useForm()
      const auth = useContext(AuthContext)

     async function signup(data){
           try{
                 
            const URL = "http://127.0.0.1:5000/api/auth/signup"     
            const sendedData = await fetch(URL, {
                       method : 'post',
                       body : JSON.stringify(data),
                       headers: { 'Content-Type': 'application/json' },
     
                 })
              const response = await sendedData.json()
     
              if (!sendedData.ok){

                    alert(response.message.errors[0].message)
                    throw new Error(response)
              }else{
                  alert(response.message)
                  auth.Login()
            }
     
           }catch(err){
                  console.log(err) 
           }

           }
      return(
                  <form className="signup-form" onSubmit={handleSubmit(signup)} >
                        <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input type="text" placeholder="username ..." name="username" ref={register({required :true}) }/>
                        </div>
                        <div className="form-group">
                              <label htmlFor="username">Email</label>
                              <input type="email" placeholder="email..." name="email" ref={register({required :true}) }/>
                        </div>
                        <div className="form-group">
                              <label htmlFor="password">Psssword</label>
                              <input type="password" placeholder="password ... " name="password" ref={register({required :true})}/>
                        </div>
                        <button type="submit">Inscription</button>
                  </form>
      )
}
