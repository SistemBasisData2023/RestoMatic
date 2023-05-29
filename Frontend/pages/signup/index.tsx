import { SignUpForm } from '@components/index'
import React from 'react'

const SignUp = () => {
  return (
    <div className="w-full h-screen bg-light-80 m-0 p-0 flex justify-center items-center flex-col gap-12 md:flex-row">
      <h1 className="m-0 text-6xl text-peach-100">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

export default SignUp
