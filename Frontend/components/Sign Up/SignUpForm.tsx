import { SignUpFormValue_Props } from '@interfaces/index'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '..'
import Link from 'next/link'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValue_Props>()

  const onSubmit = async (data) => {
    const res = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      console.log('Sign Up Successful')
    } else if (res.status === 500) {
      console.log('Sign Up Failed')
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[85%] md:w-[75%] lg:w-[70%]  flex flex-col gap-10 justify-center items-center bg-primary-60 rounded-md py-11 px-7 "
    >
      <h1 className="m-0 font-bold text-center">Make a new account</h1>
      <div className="w-full flex flex-col gap-3">
        <label className="text-lg ">Username</label>
        <input
          type="text"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          placeholder="Enter your Username"
          {...register('username', { required: true })}
        />
        {errors.username && (
          <p className="text-error-120 my-2 mb-0">Username is required</p>
        )}
      </div>

      <div className="w-full flex flex-col gap-3 ">
        <label className="text-lg ">Email Address</label>
        <input
          type="email"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          placeholder="Enter your Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <p className="text-error-120 my-2 mb-0">
            Email is required and must be valid
          </p>
        )}
      </div>

      <div className="w-full flex flex-col gap-2 ">
        <label className="text-lg =">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="text-error-120  my-2 mb-0">Password is required</p>
        )}
      </div>

      <Button
        className="w-[80%]  text-lg"
        disabled={
          errors.password || errors.email || errors.username ? true : false
        }
        type="submit"
      >
        Sign Up
      </Button>
      <div className="flex">
        <p className="m-0 font-bold">
          Already have an account?{' '}
          <Link
            className="text-primary-100 font-bold hover:text-primary-120"
            href="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  )
}

export { SignUpForm }
