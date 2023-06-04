import { LoginForm } from '@components/index'
import LoginFoodImage from 'assets/Login/LoginFoodImage.jpg'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div className="w-full min-h-screen h-full bg-primary-120 m-0 p-0 grid md:grid-cols-5 md:grid-rows-none ">
      <div className="w-full h-full relative row-span-1 hidden md:block md:col-span-2">
        <Image
          fill={true}
          placeholder="blur"
          src={LoginFoodImage}
          alt="Food Picture"
        />
      </div>
      <div className="flex items-center justify-center  md:col-span-3">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
