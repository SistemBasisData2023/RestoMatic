import PopUpModal from '@components/Pop up/PopUpModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
type Props = {
  togglePopUp: (event: React.MouseEvent<HTMLElement>) => void
}
const ProfileModal = ({ togglePopUp }: Props) => {
  return (
    <PopUpModal
      togglePopUp={togglePopUp}
      className="flex flex-col justify-center items-center p-5 bg-white rounded-md"
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
      <button className="mt-8 rounded-[18px] font-bold border-green-800 text-green-800 w-[80%] mx-auto  p-2 cursor-pointer hover:bg-green-800 hover:text-white  border-solid transition-all duration-300">
        Top Up
      </button>
    </PopUpModal>
  )
}

export { ProfileModal }
