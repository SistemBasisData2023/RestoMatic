import { BuildResponse, SignUpFormValue_Props } from '@interfaces/index'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '..'
import Link from 'next/link'
import { PopUpModal } from '@components/index'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValue_Props>()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>(null)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const onSubmit = async (data: SignUpFormValue_Props) => {
    setLoading(true)
    const res = await fetch('http://localhost:4000/api/customers/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log(res)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Error at registering up an account')
    }
    setLoading(false)
    const bodyResponse: BuildResponse = await res.json()
    console.log(bodyResponse)

    if (
      bodyResponse.message.includes('duplicate') &&
      bodyResponse.message.includes('username_key')
    )
      setResponseMessage('Username already exist')
    if (
      bodyResponse.message.includes('duplicate') &&
      bodyResponse.message.includes('email_key')
    )
      setResponseMessage('email already exist')

    if (bodyResponse.data.length === 0) setShowErrorModal(true)
    else setShowSuccessModal(true)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[85%] md:w-[75%] lg:w-[70%]  flex flex-col gap-10 justify-center items-center bg-primary-60 rounded-md py-11 px-7 "
    >
      <h1 className="m-0 font-bold text-center">Make a new account</h1>
      <div className="flex flex-col w-full gap-3">
        <label className="text-lg ">Username</label>
        <input
          type="text"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          placeholder="Enter your Username"
          {...register('username', {
            required: true,
            pattern: /^[A-Za-z0-9_]{6,15}$/,
          })}
        />
        {errors.username && (
          <p className="my-2 mb-0 text-error-120">
            Username is required and minimum 6 characters
          </p>
        )}
      </div>

      <div className="flex flex-col w-full gap-3 ">
        <label className="text-lg ">Email Address</label>
        <input
          type="email"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          placeholder="Enter your Email"
          {...register('email', {
            required: true,
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/,
          })}
        />
        {errors.email && (
          <p className="my-2 mb-0 text-error-120">
            Email is required and must be valid
          </p>
        )}
      </div>

      <div className="flex flex-col w-full gap-2 ">
        <label className="text-lg =">Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          className="border-none rounded-[14px] bg-primary-80 p-4 w-full"
          {...register('password', {
            required: true,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,25}$/,
          })}
        />
        {errors.password && (
          <p className="my-2 mb-0 text-error-120">Password is required</p>
        )}
      </div>

      <Button
        className="w-[80%]  text-lg"
        disabled={
          errors.password || errors.email || errors.username ? true : false
        }
        type="submit"
      >
        {isLoading ? 'LOADING...' : 'REGISTER'}
      </Button>
      <div className="flex">
        <p className="m-0 font-bold">
          Already have an account?{' '}
          <Link
            className="font-bold text-primary-100 hover:text-primary-120"
            href="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
      {showErrorModal && (
        <PopUpModal
          closePopUp={() => setShowErrorModal(false)}
          className="p-20 py-7"
        >
          <h1 className="mt-0 text-center text-error-120">Error</h1>
          {responseMessage}
        </PopUpModal>
      )}
      {showSuccessModal && (
        <PopUpModal
          closePopUp={() => {
            setShowSuccessModal(false)
            router.push('/login')
          }}
          className="p-20 py-7 "
        >
          <h1 className="mt-0 text-center text-success-100">Success</h1>
          Account has been created
        </PopUpModal>
      )}
    </form>
  )
}

export { RegisterForm }
