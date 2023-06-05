import { BuildResponse, LoginFormValue_Props } from '@interfaces/index'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '..'
import { useRouter } from 'next/router'
import { PopUpModal } from '@components/index'
import { useUser } from '@context/UserContext'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue_Props>()
  const { login } = useUser()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>(null)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const onSubmit = async (data: LoginFormValue_Props) => {
    setLoading(true)

    const res = await fetch('http://localhost:4000/api/customers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    setLoading(false)
    console.log(res.status)

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Error at Logging in an account')
    }

    const bodyResponse: BuildResponse = await res.json()
    console.log(bodyResponse)

    if (bodyResponse.data.login) {
      setResponseMessage(bodyResponse.message)
      setShowSuccessModal(true)
      login(bodyResponse.data.accountDetails)
      return
    } else {
      setResponseMessage(bodyResponse.message)
      setShowErrorModal(true)
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
        className="w-[80%] text-lg"
        disabled={errors.password || errors.email ? true : false}
        type="submit"
      >
        {isLoading ? 'LOADING...' : 'LOGIN'}
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
            router.push('/')
          }}
          className="p-20 py-7 "
        >
          <h1 className="mt-0 text-center text-success-100">Success</h1>
          {responseMessage}
        </PopUpModal>
      )}
    </form>
  )
}

export { LoginForm }
