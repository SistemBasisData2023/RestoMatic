import { RegisterForm } from '@components/index'
import RegisterFoodImage from '@assets/Register/RegisterFoodImage.jpg'
import Image from 'next/image'
import React from 'react'

const Register = () => {
  return (
    <div className="grid w-full h-full min-h-screen p-0 m-0 bg-primary-120 md:grid-cols-5 ">
      <div className="flex items-center justify-center md:col-span-3">
        <RegisterForm />
      </div>
      <div className="relative hidden w-full h-full row-span-1 md:block md:col-span-2">
        <Image
          fill={true}
          placeholder="blur"
          src={RegisterFoodImage}
          alt="Food Picture"
        />
      </div>
    </div>
  )
}

export default Register
