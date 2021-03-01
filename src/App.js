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

function App() {

const [token, setToken] = useState( false)
const [userId, setUserId] = useState( false)



const login = useCallback((userId, token)=>{
  setToken(token)
  setUserId(userId)
}, [])

const logout = useCallback(()=>{
  localStorage.removeItem('auth')
  setToken(false)
},[])


useEffect(()=>{
  const credantials = JSON.parse(localStorage.getItem('auth'))

  if(credantials && credantials.token && credantials.userId){
    login(credantials.userId, credantials.token)
  }
}, [login])

let routes

if(token){
    routes = (
      <Switch>
         <Route path="/" exact>
            <Home/>
         </Route>
         <Route path='/add-post' exact>
            <AddPost/>
         </Route>
         <Route path='/profile' exact>
            <Profile/>
         </Route>
         <Route path='/posts' exact>
            <MyPost/>
         </Route>
         <Redirect to ='/'/>
      </Switch>
    )
}else{
  routes = (
    <Switch>
                 <Route path='/login' exact>
                    <Login/>
                  </Route>
                <Route path='/signup'>
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
