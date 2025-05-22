import React from 'react'
import { ListChecks } from 'lucide-react'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <ListChecks size={54} className='mb-4.5' />
        <h1>Taskify</h1>
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-bold'>Login</h2>
            <form className='flex flex-col items-center'>
                <input type="text" placeholder="Username" className='border border-gray-300 rounded p-2 mb-4' />
                <input type="password" placeholder="Password" className='border border-gray-300 rounded p-2 mb-4' />
                <button type="submit" className='bg-blue-500 text-white rounded p-2'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default LoginPage