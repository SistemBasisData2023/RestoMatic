import { LoginForm } from '@components/index'
import React from 'react'

const Login = () => {
  return (
    <div className="w-full h-screen bg-peach-100 m-0 p-0 flex justify-center items-center flex-col gap-12 md:flex-row">
      <h1 className="m-0 text-6xl">Restomatic</h1>
      <LoginForm />
    </div>
  )
}

export default Login
