import { PopUpModal } from '@components/index'
import React, { useRef, useState } from 'react'
import { Button } from '@components/index'
import { useUser } from '@context/UserContext'
import { DotEvery3Decimals } from '@utils/functions'
import { useRouter } from 'next/router'
import { BuildResponse } from '@interfaces/index'
import { SuccessErrorModal } from '@components/Pop up/SuccessErrorModal'

type Props = {
  togglePopUp: () => void
}
const ProfileModal = ({ togglePopUp }: Props) => {
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
    const res = await fetch(
      `http://localhost:4000/api/customers/${user.id}/topup?` +
        new URLSearchParams({
          amount: balance,
        }),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!res.ok) {
      throw new Error('Error at top up a balance')
    }

    const bodyResponse: BuildResponse = await res.json()
    setResponseMessage(bodyResponse.message)

    if (bodyResponse.data.topup) {
      const res = await fetch(
        `http://localhost:4000/api/customers/${user.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!res.ok) {
        throw new Error('Error at getting account data')
      }
      const bodyResponse: BuildResponse = await res.json()
      const { id, email, username, balance } = bodyResponse.data
      login({ id, email, username, balance })
      setLoading(false)
      setSuccessOrError('success')
    } else {
      setSuccessOrError('error')
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
      className="flex flex-col items-center justify-center p-5 px-8 bg-white rounded-md"
    >
      <h2>Profile Details</h2>
      <div className="flex gap-5">
        <p>Username: </p>
        {user && <p>{user.username}</p>}
      </div>
      <div className="flex gap-5">
        <p>Email: </p>
        {user && <p>{user.email}</p>}
      </div>
      <div className="flex gap-5">
        <p>Balance: </p>
        {user && <p>Rp {DotEvery3Decimals(user.balance)}</p>}
      </div>
      <input
        className="border-none rounded-[14px] bg-primary-80 p-2 w-full"
        ref={refBalance}
        defaultValue={0}
        placeholder="Enter your balance"
        type="number"
      />
      <Button onClick={TopUpHandler} className="mt-8 w-[80%]">
        {isLoading ? 'Loading...' : 'Top Up'}
      </Button>
      <Button onClick={LogOutHandler} className="mt-5 w-[80%]">
        Log Out
      </Button>
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
