import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
type Popup = {
  children: ReactNode
  className?: string
  disableXbutton?: boolean
  togglePopUp?: () => void
}

const PopUpModal = ({
  children,
  className,
  togglePopUp,
  disableXbutton = false,
}: Popup) => {
  return (
    <div className="fixed top-0 py-16 flex justify-center  overflow-auto  left-0 z-[999] w-screen h-screen bg-black bg-opacity-75 ">
      <div className={` overflow-auto relative h-fit my-auto ${className}`}>
        {!disableXbutton && (
          <button
            className="absolute top-0 right-0 mr-3 mt-3 border-none cursor-pointer bg-inherit hover:scale-125 duration-300"
            onClick={togglePopUp}
          >
            <FontAwesomeIcon className=" " icon={faXmark} size="xl" />
          </button>
        )}

        {children}
      </div>
    </div>
  )
}

export default PopUpModal
