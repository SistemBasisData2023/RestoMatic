import { SignUpForm } from '@components/index'
import RegisterFoodImage from '@assets/Register/RegisterFoodImage.jpg'
import Image from 'next/image'
import React from 'react'

const SignUp = () => {
  return (
    <div className="w-full min-h-screen h-full bg-primary-120 m-0 p-0 grid md:grid-cols-5  ">
      <div className="flex items-center justify-center  md:col-span-3">
        <SignUpForm />
      </div>
      <div className="w-full h-full relative row-span-1 hidden md:block md:col-span-2">
        <Image fill={true} src={RegisterFoodImage} alt="Food Picture" />
      </div>
    </div>
  )
}

export default SignUp
