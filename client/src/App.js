import React, { useState, useEffect}  from 'react'
import { DataContext } from './components/DataContext'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'




const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  
  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  const handleLogOut = (e) => {
    //Reset all auth related state and clear localStorage
    e.preventDefault()
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
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
      
       <Header />
        <main>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='signup' element={ <SignUp /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='profile' element={ <Profile /> } />

          
        </Routes>
        </main>

        <footer>

        </footer>

      </DataContext.Provider>
    </div>
  );
}

export default App;
