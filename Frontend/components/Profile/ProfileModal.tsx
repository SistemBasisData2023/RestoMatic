import { PopUpModal } from '@components/index'
import React, { useRef, useState } from 'react'
import { Button } from '@components/index'
import { useUser } from '@context/UserContext'
import { DotEvery3Decimals } from '@utils/functions'
import { useRouter } from 'next/router'

type Props = {
  togglePopUp: () => void
}
const ProfileModal = ({ togglePopUp }: Props) => {
  const router = useRouter()
  const { user, logout } = useUser()
  const [topUpBalance, setTopUpBalance] = useState<number>()
  const refBalance = useRef(null)
  const TopUpHandler = () => {
    setTopUpBalance(refBalance.current.value)
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
        Top Up
      </Button>
      <Button onClick={LogOutHandler} className="mt-5 w-[80%]">
        Log Out
      </Button>
    </PopUpModal>
  )
}

export { ProfileModal }
