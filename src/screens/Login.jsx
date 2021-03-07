import  React , {useContext}  from 'react';
import { useForm } from 'react-hook-form'

import { AuthContext } from '../context/auth.context'
import './login.css'


export default function Login(){
 

      const auth = useContext(AuthContext)
      const { handleSubmit , register , errors } = useForm()

     async function handleLogin(data){
           try{
                 const URL = "http://127.0.0.1:5000/api/auth/login"
                 
                 const sendedData = await fetch(URL, {
                          method : 'post',
                          body : JSON.stringify(data),
                          headers: { 'Content-Type': 'application/json' },
        
                    })
                 const response = await sendedData.json()
                 console.log(response)
                 localStorage.setItem('auth' , JSON.stringify(response))
                // sessionStorage.setItem('auth' , JSON.stringify(response))

     
                 if (!sendedData.ok){
                       alert(response.message)
                       throw new Error(response)
                 }else{
                       auth.Login(response.userId, response.token)
                 }
                 return response

           }catch (err){
                 console.log(err)
           }
      }

      const response = handleLogin
      console.log(response)
      return(
                  <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input type="email" placeholder="email..." name="email"   ref={register({required : true})}/>
                        </div>
                        <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" placeholder="password ..." name="password" ref={register({required : true})} />
                        </div>
                        <button type="submit">Connexion</button>
                  </form>
      )
}
