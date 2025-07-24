import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext';

export default function Register() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', form);
            console.log(res.data);
            const {user, token} = res.data
            login(user, token);
            navigate('/')
            alert('Registered Successfully');

        } catch (error) {
            console.log(error);
            alert('Registered Failed');
        }
    }
  return (
    <div className='flex justify-center'>
        <form className='flex flex-col items-center gap-3 justify-center h-screen w-fit' onSubmit={handleSubmit}>
        <h1 className='text-blue-800 text-3xl font-bold px-3 py-3'>Register</h1>
            <input className='border-2 px-2 py-1 border-blue-400  rounded-md' type="text" name='name' placeholder='name' onChange={handleChange}/>
            <input className='border-2 px-2 py-1 border-blue-400 rounded-md' type="email" name='email' placeholder='email' onChange={handleChange}/>
            <input className='border-2 px-2 py-1 border-blue-400 rounded-md' type="password" name='password' placeholder='password' onChange={handleChange}/>
            <button className='bg-blue-600 px-3 py-1 rounded-md text-white w-full' type='submit'>Register</button>
        </form>
    </div>
  )
}
