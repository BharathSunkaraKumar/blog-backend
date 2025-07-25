import { useAuth } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'
Navigate

export default function PrivateRoute({children}) {
    const {user} = useAuth()
  return user ? children : <Navigate to='/login'/>
}
