import React from 'react'
import { useRouter } from 'next/router';

const Restaurant = () => {
  const router = useRouter();

  return (
    <div>Restaurant: {router.query.id}</div>
  )
}

export default Restaurant