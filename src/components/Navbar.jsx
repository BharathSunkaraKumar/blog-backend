import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

export default function Navbar() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout= () => {
        logout();
        navigate('/login')
    }
  return (
    <nav className='shadow-md flex gap-3 justify-end px-3 py-2'>
        {
            user && <Link className='hover:text-blue-500 font-semibold' to='/create-post'>Create post</Link>
        }
        {!user ? (
            <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </>
        ) : (
            
            <button onClick={handleLogout}>Logout</button>
        
        )}
        <Link className='hover:text-blue-500 font-semibold' to='/'>Home</Link>
    </nav>
  )
}
