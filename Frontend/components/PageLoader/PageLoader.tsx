import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 z-[999] w-screen h-screen flex justify-center items-center bg-black bg-opacity-75 ">
      <div className="flex flex-col gap-4 text-white">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className=""
          size="9x"
          spin={true}
        />
        <h1>Loading Page</h1>
      </div>
    </div>
  )
}

export default PageLoader
