import  React , {useContext}  from 'react';
import { useForm } from 'react-hook-form'

import { AuthContext } from '../context/auth.context'
import './login.css'

const LOGIN_URL = "http://127.0.0.1:5000/api/auth/login"
export default function Login(){
 

      const auth = useContext(AuthContext)
      const { handleSubmit , register , errors } = useForm()

     async function handleLogin(data){
           try{
               
                 
                 const sendedData = await fetch(LOGIN_URL, {
                          method : 'post',
                          body : JSON.stringify(data),
                          headers: { 'Content-Type': 'application/json' },
        
                    })
                 const response = await sendedData.json()
                 
                 localStorage.setItem('auth' , JSON.stringify(response))

                 if (!sendedData.ok){
                       alert("Email ou mot de passe incorrecte")
                       throw new Error(response)
                 }else{
                       auth.Login(response.userId, response.token)
                 }
                 return response

           }catch (err){
                 console.log(err)
           }
      }
     
      return(
                  <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input type="email" placeholder="email..." name="email"   ref={register({required : true})}/>
                              {
                                    errors.email && <code>Une adresse mail valide est requise</code>
                              }
                        </div>
                        <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" placeholder="password ..." name="password" autoComplete="true" ref={register({required : true})} />
                              {errors.password && <code>Mot de Passe obligatoire</code>}
                        </div>
                        <button type="submit">Connexion</button>
                  </form>
      )
}
