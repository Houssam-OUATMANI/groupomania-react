import  React ,{ useCallback, useState } from 'react'

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

const [loggedIn, setLoggedIn] = useState( false)

const login = useCallback(()=>{
  setLoggedIn(true)
}, [])

const logout = useCallback(()=>{
  setLoggedIn(false)
}, [])

let routes

if(loggedIn){
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
      <AuthContext.Provider value={{ loggedIn : loggedIn, Login :login, Logout : logout }}>
          <Router>
            <NavBar/>
            {routes}
          </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
