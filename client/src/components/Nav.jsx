import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from './DataContext'

const Nav = () => {
  const { authenticated, user, handleLogOut } = useContext( DataContext )
      
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        <h3>Welcome {user.email}!</h3>
      
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Register</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          <img
            className="logo"
            src=""
            alt="welcome banner"
          />
        </div>
      </Link>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav