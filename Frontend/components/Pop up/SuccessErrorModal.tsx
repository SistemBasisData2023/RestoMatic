import React, { Dispatch, SetStateAction } from 'react'
import { PopUpModal } from './PopUpModal'
import { useRouter } from 'next/router'

type SuccessProps = {
  className?: string
  message?: string
  routerPush?: string | null
  query?: any
  type: 'success' | 'error' | null
  disableXbutton?: boolean
  disableClickOutside?: boolean
  showModal: Dispatch<SetStateAction<any>>
}
const SuccessErrorModal = ({
  className,
  showModal,
  message,
  type,
  query = null,
  routerPush = null,
  disableXbutton = false,
  disableClickOutside = false,
}: SuccessProps) => {
  const router = useRouter()
  return (
    <PopUpModal
      closePopUp={() => {
        showModal(false)
        if (routerPush !== null && type === 'success')
          router.push({
            pathname: routerPush,
            query: query,
          })
      }}
      className={`${className} p-5`}
      disableXbutton={disableXbutton}
      disableClickOutside={disableClickOutside}
    >
      <h1
        className={`mt-0 text-center ${
          type === 'success' ? 'text-success-100' : 'text-error-120'
        } `}
      >
        {type === 'success' ? 'SUCCESS' : 'ERROR'}
      </h1>
      <p className="m-0">{message}</p>
    </PopUpModal>
  )
}

export { SuccessErrorModal }
