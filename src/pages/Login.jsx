import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const {login} = useAuth()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            // localStorage.setItem('token', res.data.token)
            login(res.data.user, res.data.token)
            navigate('/')
            alert('login Successfully');

        } catch (error) {
            console.log(error);
            alert('login Failed');
        }
    }
  return (
    <div className='flex justify-center'>
        <form className='flex flex-col items-center gap-3 justify-center h-screen w-fit' onSubmit={handleSubmit}>
        <h1 className='text-blue-800 text-3xl font-bold px-3 py-3'>Login</h1>
            <input className='border-2 px-2 py-1 border-blue-400 rounded-md' type="email" name='email' placeholder='email' onChange={handleChange}/>
            <input className='border-2 px-2 py-1 border-blue-400 rounded-md' type="password" name='password' placeholder='password' onChange={handleChange}/>
            <button className='bg-blue-600 px-3 py-1 rounded-md text-white w-full' type='submit'>Login</button>
        </form>
    </div>
  )
}
