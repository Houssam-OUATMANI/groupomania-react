import  React ,{ useCallback, useState, useEffect } from 'react'

import { BrowserRouter as Router , Switch , Route , Redirect  } from 'react-router-dom'

import NavBar from './components/Navigation/NavBar';

import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import AddPost from './screens/AddPost';


import { AuthContext } from './context/auth.context'
import Profile from './screens/Profile';
import MyPost from './screens/MyPost';
import AdminLogin from './screens/AdminLogin'

function App() {

const [token, setToken] = useState( false)
const [userId, setUserId] = useState( false)

 


const login = useCallback((userId, token)=>{
  setToken(token)
  setUserId(userId)
}, [])

const logout = useCallback(()=>{
  localStorage.removeItem('auth')
  localStorage.removeItem('admin')
  setToken(false)
},[])

const adminCredantials = JSON.parse(localStorage.getItem('admin')) || undefined

useEffect(()=>{
  const credantials = JSON.parse(localStorage.getItem('auth')) || undefined
  const adminCredantials = JSON.parse(localStorage.getItem('admin')) || undefined


  if(credantials && credantials.token && credantials.userId){
    login(credantials.userId, credantials.token)
  }

  if(adminCredantials && adminCredantials.token && adminCredantials.adminId){
    login(adminCredantials.adminId, adminCredantials.token)
  }

}, [login])

let routes

if(token){
    routes = (
      <Switch>
          {!!adminCredantials === false && (
          <Route path="/" exact>
              <Home/>
          </Route>
          )}
         {!!adminCredantials === false && (
          <Route path='/add-post' exact>
              <AddPost/>
          </Route>
         )}
         {
           !!adminCredantials === false && (
            <Route path='/profile' exact>
                <Profile/>
            </Route>
           )
         }
         <Route path='/posts' exact>
            <MyPost/>
         </Route>
         <Redirect to ={!!adminCredantials === true ? "/posts" : '/'}/>
      </Switch>
    )
}else{
  routes = (
    <Switch>
                 <Route path='/login' exact>
                    <Login/>
                  </Route>
                  <Route path='/admin' exact>
                    <AdminLogin/>
                  </Route>
                <Route path='/signup' exact>
                    <Signup/>
                  </Route>
                <Redirect to="/login"/>
    </Switch>
  )
}
  return (
    <div className="App">
      <AuthContext.Provider value={{ loggedIn : !!token, Login :login, Logout : logout, token : token }}>
          <Router>
            <NavBar/>
            {routes}
          </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
