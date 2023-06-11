import { RegisterForm } from '@components/index'
import RegisterFoodImage from '@assets/Register/RegisterFoodImage.jpg'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Router } from 'next/router'
import PageLoader from '@components/PageLoader/PageLoader'

const Register = () => {
  const [loadingPage, setLoadingPage] = useState(false)
  useEffect(() => {
    const start = () => {
      setLoadingPage(true)
    }
    const end = () => {
      setLoadingPage(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <>
      <div className="grid w-full h-full min-h-screen p-0 m-0 bg-primary-120 md:grid-cols-5 ">
        <div className="flex items-center justify-center md:col-span-3">
          <RegisterForm />
        </div>
        <div className="relative hidden w-full h-full row-span-1 md:block md:col-span-2">
          <Image
            fill={true}
            placeholder="blur"
            src={RegisterFoodImage}
            alt="Food Picture"
          />
        </div>
      </div>
      {loadingPage && <PageLoader />}
    </>
  )
}

export default Register
