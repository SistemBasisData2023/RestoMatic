import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 bg-white rounded-md py-11 px-7 w-[85%] md:w-[50%] lg:w-[37%]"
    >
      <div className="flex flex-col">
        <label className="text-lg pl-4">Email Address</label>
        <input
          type="email"
          className="border-none rounded-[14px] bg-light-80 p-4 w-full"
          placeholder="Enter your Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && (
          <p className="text-error-120 pl-4 ">
            Email is required and must be valid
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-lg pl-4">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="border-none rounded-[14px] bg-light-80 p-4 w-full"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="text-error-120 pl-4">Password is required</p>
        )}
      </div>

      <Link className="pl-4" href="/signup">
        Sign Up
      </Link>
      <button
        className="border-none rounded-md w-1/2 m-auto p-2 cursor-pointer"
        type="submit"
      >
        Login
      </button>
    </form>
  )
}

export { LoginForm }
