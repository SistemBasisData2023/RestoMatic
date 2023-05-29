import { SignUpFormValue } from '@interfaces/index'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValue>()

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
      className="flex flex-col bg-white rounded-md py-11 px-7 w-[85%] md:w-[50%] lg:w-[37%]"
    >
      <div className="flex flex-col gap-3">
        <label className="text-lg pl-4">Username</label>
        <input
          type="text"
          className="border-none rounded-[14px] bg-light-80 p-4 w-full"
          placeholder="Enter your Username"
          {...register('username', { required: true })}
        />
      </div>
      {errors.username && (
        <p className="text-error-120 pl-4 mt-2 mb-0">Username is required</p>
      )}
      <div className="flex flex-col gap-3 mt-10">
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

      <button
        className={`border-none rounded-[18px]  w-1/2 mx-auto mt-7 p-2 font-bold text-base text-white ${
          errors.password || errors.email || errors.username
            ? 'bg-peach-80 cursor-not-allowed	'
            : 'bg-peach-100 cursor-pointer '
        }`}
        disabled={
          errors.password || errors.email || errors.username ? true : false
        }
        type="submit"
      >
        Sign Up
      </button>
    </form>
  )
}

export { SignUpForm }
