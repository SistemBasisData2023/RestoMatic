import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
type FormValue = {
  email: string
  password: string
}
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>()

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white rounded-md py-11 px-7 w-[85%] md:w-[50%] lg:w-[37%]"
    >
      <div className="flex flex-col gap-3">
        <label className="text-lg pl-4">Email Address</label>
        <input
          type="email"
          className="border-none rounded-[14px] bg-light-80 p-4 w-full"
          placeholder="Enter your Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      {errors.email && (
        <p className="text-error-120 pl-4 mt-2 mb-0">
          Email is required and must be valid
        </p>
      )}
      <div className="flex flex-col gap-2 mt-10">
        <label className="text-lg pl-4">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="border-none rounded-[14px] bg-light-80 p-4 w-full"
          {...register('password', { required: true })}
        />
      </div>
      {errors.password && (
        <p className="text-error-120 pl-4 mt-2 mb-0">Password is required</p>
      )}

      <Link className="pl-4 w-1/5 mt-10" href="/signup">
        Sign Up
      </Link>
      <button
        className={`border-none rounded-[18px]  w-1/2 mx-auto mt-5 p-2 font-bold text-base text-white ${
          errors.password || errors.email
            ? 'bg-peach-80 cursor-not-allowed	'
            : 'bg-peach-100 cursor-pointer '
        }`}
        disabled={errors.password || errors.email ? true : false}
        type="submit"
      >
        Login
      </button>
    </form>
  )
}

export { LoginForm }
