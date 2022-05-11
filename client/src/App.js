import React, { useState, useEffect}  from 'react'
import { DataContext } from './components/DataContext'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import './App.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Nav from './components/Nav';



const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  
  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    console.log(user)
    setUser(user)
    toggleAuthenticated(true)
    
  }

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
   
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
    console.log(user)
  }, [])




  return (
    <div className="App">
      <DataContext.Provider value={{
        authenticated,
        toggleAuthenticated,
        user,
        setUser,
        handleLogOut
      }}>
      
        <Nav />
        <main>
          
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='signup' element={ <SignUp /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='home2' element={ <Home2/> } />

          
        </Routes>
        </main>

        <footer>

        </footer>

      </DataContext.Provider>
    </div>
  );
}

export default App;
