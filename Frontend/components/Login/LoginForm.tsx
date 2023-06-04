import { LoginFormValue_Props } from '@interfaces/index'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '..'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue_Props>()

  const onSubmit = async (data) => {
    const res = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      console.log('Login Successful')
    } else if (res.status === 500) {
      console.log('Login Failed')
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[85%] md:w-[75%] lg:w-[70%] flex flex-col gap-10 justify-center items-center bg-primary-60 rounded-[30px] p-11 "
    >
      <h1 className="m-0 font-bold text-center ">Login with your account</h1>
      <div className="flex flex-col w-full gap-3 ">
        <label className="text-lg">Email Address</label>
        <input
          type="email"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          placeholder="Enter your Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <p className="my-2 mb-0 text-error-120">
            Email is required and must be valid
          </p>
        )}
      </div>

      <div className="flex flex-col w-full gap-2 ">
        <label className="text-lg">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="my-2 mb-0 text-error-120">Password is required</p>
        )}
      </div>

      <Button
        className="w-[80%]  text-lg"
        disabled={errors.password || errors.email ? true : false}
        type="submit"
      >
        Login
      </Button>
      <div className="flex">
        <p className="m-0 font-bold">
          Don't have an account?{' '}
          <Link
            className="font-bold text-primary-100 hover:text-primary-120"
            href="/register"
          >
            Register Now
          </Link>
        </p>
      </div>
    </form>
  )
}

export { LoginForm }
