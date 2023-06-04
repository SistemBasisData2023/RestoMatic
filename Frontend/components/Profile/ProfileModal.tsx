import PopUpModal from '@components/Pop up/PopUpModal'
import React from 'react'
import { Button } from '@components/index'

type Props = {
  togglePopUp: () => void
}
const ProfileModal = ({ togglePopUp }: Props) => {
  return (
    <PopUpModal
      closePopUp={togglePopUp}
      className="flex flex-col justify-center items-center p-5 px-8 bg-white rounded-md"
    >
      <h2>Profile Details</h2>
      <div className="flex gap-5">
        <p>Username: </p>
        <p>Customer Username</p>
      </div>
      <div className="flex gap-5">
        <p>Email: </p>
        <p>Customer Email</p>
      </div>
      <div className="flex gap-5">
        <p>Balance: </p>
        <p>Rp Customer Balance</p>
      </div>
      <Button className="mt-8 w-[80%]">Top Up</Button>
    </PopUpModal>
  )
}

export { ProfileModal }