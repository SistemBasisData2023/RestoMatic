import PageLoader from '@components/PageLoader/PageLoader'
import { LoginForm } from '@components/index'
import LoginFoodImage from 'assets/Login/LoginFoodImage.jpg'
import Image from 'next/image'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'

const Login = () => {
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
    <div className="w-full min-h-screen h-full bg-primary-120 m-0 p-0 grid md:grid-cols-5 md:grid-rows-none ">
      <div className="w-full h-full relative row-span-1 hidden md:block md:col-span-2">
        <Image
          fill={true}
          placeholder="blur"
          src={LoginFoodImage}
          alt="Food Picture"
        />
      </div>
      <div className="flex items-center justify-center  md:col-span-3">
        <LoginForm />
      </div>
      {loadingPage && <PageLoader />}
    </div>
  )
}

export default Login
