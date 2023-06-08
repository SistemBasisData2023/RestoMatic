import { BuildResponse, LoginFormValue_Props } from '@interfaces/index'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '..'
import { useUser } from '@context/UserContext'
import { SuccessErrorModal } from '@components/Pop up/SuccessErrorModal'
import { POST_LOGINCUSTOMER } from '@utils/APIs'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue_Props>()
  const { login } = useUser()
  const [isLoading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>(null)
  const [showSuccessErrorModal, setShowSuccessErrorModal] =
    useState<boolean>(false)
  const [successOrError, setSuccessOrError] = useState<
    'success' | 'error' | null
  >()
  const onSubmit = async (data: LoginFormValue_Props) => {
    setLoading(true)

    const bodyResponse: BuildResponse = await POST_LOGINCUSTOMER(data)

    setLoading(false)
    setResponseMessage(bodyResponse.message)
    if (bodyResponse.data.login) {
      login(bodyResponse.data.accountDetails)
      setSuccessOrError('success')
    } else {
      setSuccessOrError('error')
    }
    setShowSuccessErrorModal(true)
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

      {showSuccessErrorModal && (
        <SuccessErrorModal
          type={successOrError}
          showModal={setShowSuccessErrorModal}
          message={responseMessage}
          routerPush="/"
          className="p-20 py-7"
        />
      )}
    </form>
  )
}

export { LoginForm }
