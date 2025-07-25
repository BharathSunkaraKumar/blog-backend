import { createContext, useContext, useState, useEffect, Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[user, setUser] = useState(null);

    useEffect(() => {
        const savedUSer = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if(savedToken && savedUSer) {
            setUser({...JSON.parse(savedUSer), token: savedToken});
        }
    },[])

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser({...userData, token});
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);