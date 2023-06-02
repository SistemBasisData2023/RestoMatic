import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'

type Popup = {
  children: ReactNode
  className?: string
  togglePopUp: (event: React.MouseEvent<HTMLElement>) => void
}

const PopUpModal = ({ children, className, togglePopUp }: Popup) => {
  return (
    <div className="fixed top-0 left-0 z-[999] w-screen h-screen bg-black bg-opacity-75">
      <div
        className={`absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] ${className}`}
      >
        <button
          className=" border-none cursor-pointer ml-auto bg-inherit hover:scale-125 duration-300"
          onClick={togglePopUp}
        >
          <FontAwesomeIcon className=" " icon={faXmark} size="xl" />
        </button>

        {children}
      </div>
    </div>
  )
}

export default PopUpModal
