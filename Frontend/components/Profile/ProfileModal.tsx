import { PopUpModal } from '@components/index'
import React, { useRef, useState } from 'react'
import { Button } from '@components/index'
import { useUser } from '@context/UserContext'
import { DotEvery3Decimals } from '@utils/functions'
import { useRouter } from 'next/router'
import { BuildResponse } from '@interfaces/index'
import { SuccessErrorModal } from '@components/Pop up/SuccessErrorModal'
import { GET_CUSTOMER, PATCH_TOPUP } from '@utils/APIs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

type Props = {
  togglePopUp: () => void
  noLogOutButton?: boolean
}
const ProfileModal = ({ togglePopUp, noLogOutButton = false }: Props) => {
  const router = useRouter()
  const { user, logout, login } = useUser()
  const [isLoading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>(null)
  const [showSuccessErrorModal, setShowSuccessErrorModal] =
    useState<boolean>(false)
  const [successOrError, setSuccessOrError] = useState<
    'success' | 'error' | null
  >()
  const refBalance = useRef(null)
  const TopUpHandler = async () => {
    const balance = refBalance.current.value
    setLoading(true)

    const bodyResponse: BuildResponse = await PATCH_TOPUP(user.id, balance)

    if (bodyResponse.data.topup) {
      const bodyResponse: BuildResponse = await GET_CUSTOMER(user.id)
      const { id, email, username, balance } = bodyResponse.data
      login({ id, email, username, balance })
      setLoading(false)
      setResponseMessage('Top Up Successful')
      setSuccessOrError('success')
    } else {
      setSuccessOrError('error')
      setResponseMessage('Top Up Failed')
      setLoading(false)
    }
    setShowSuccessErrorModal(true)
  }
  const LogOutHandler = () => {
    router.push('/login')
    logout()
  }
  return (
    <PopUpModal
      closePopUp={togglePopUp}
      disableClickOutside={true}
      className="flex flex-col p-5  w-[35%] bg-primary-60 rounded-md gap-8 font-bold"
    >
      <h2 className="m-0">User Profile</h2>
      <div className="flex flex-col gap-0">
        <p className=" text-[12px] m-0 text-primary-100 font-bold">USERNAME</p>
        {user && <p className="m-0">{user.username}</p>}
      </div>
      <div className="flex flex-col">
        <p className="text-[12px] m-0 text-primary-100 font-bold">EMAIL</p>
        {user && <p className="m-0">{user.email}</p>}
      </div>
      <div className="flex flex-col">
        <p className="text-[12px] m-0 text-primary-100 font-bold">BALANCE</p>
        {user && <p className="m-0">Rp {DotEvery3Decimals(user.balance)}</p>}
      </div>
      <div>
        <p className="text-[12px] m-0 mb-1 text-primary-100 font-bold">
          TOP UP
        </p>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <input
            className="border-none rounded-[10px] bg-primary-70 p-2 w-full md:w-[80%]"
            ref={refBalance}
            defaultValue={0}
            min={0}
            placeholder="Insert Balance Amount"
            type="number"
          />
          <Button
            onClick={TopUpHandler}
            className=" w-full md:w-[20%] font-bold  rounded-[10px]"
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faCircleNotch} spin={true} />
            ) : (
              'ENTER'
            )}
          </Button>
        </div>
      </div>

      {!noLogOutButton && (
        <Button
          onClick={LogOutHandler}
          className="w-full mx-auto bg-transparent text-secondary-60 border-secondary-60 rounded-md font-bold border-solid border-[3px] hover:bg-secondary-60"
        >
          LOG OUT
        </Button>
      )}

      {showSuccessErrorModal && (
        <SuccessErrorModal
          type={successOrError}
          showModal={setShowSuccessErrorModal}
          routerPush={null}
          message={responseMessage}
          className="p-20 py-7"
        />
      )}
    </PopUpModal>
  )
}

export { ProfileModal }
