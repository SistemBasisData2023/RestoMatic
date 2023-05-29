import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HomePage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/login')
  }, [])

  return <div>Home Page</div>
}
export default HomePage
