import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode, useEffect, useRef } from 'react'
type Popup = {
  children: ReactNode
  className?: string
  disableXbutton?: boolean
  closePopUp?: () => void
}

const PopUpModal = ({
  children,
  className,
  closePopUp,
  disableXbutton = false,
}: Popup) => {
  const ref = useRef(null)
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref])
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closePopUp()
      //console.log('Clicked Outside')
    } else {
      //console.log('Clicked Inside')
    }
  }
  return (
    <div className="fixed top-0 py-16 flex justify-center  overflow-auto  left-0 z-[999] w-screen h-screen bg-black bg-opacity-75 ">
      <div
        className={` overflow-auto relative h-fit my-auto bg-primary-60 p-4 rounded-md ${className}`}
        ref={ref}
      >
        {!disableXbutton && (
          <button
            className="absolute top-0 right-0 mt-3 mr-3 duration-300 border-none cursor-pointer bg-inherit hover:scale-125"
            onClick={closePopUp}
          >
            <FontAwesomeIcon className="" icon={faXmark} size="xl" />
          </button>
        )}

        {children}
      </div>
    </div>
  )
}

export default PopUpModal
