import { PopUpModal, ProfileModal } from '@components/index'
import React, { useState } from 'react'
import CartChildModal from './CartChildModal'
import { useUser } from '@context/UserContext'
import { Menu_Props, Restaurant_Props } from '@interfaces/index'
import Image from 'next/image'
import { Button } from '..'
import { useRouter } from 'next/router'

type Props = {
  togglePopUp: () => void
  MenuRestaurantData: Menu_Props[]
  restaurant?: Restaurant_Props
}

const CartModal = ({ togglePopUp, MenuRestaurantData }: Props) => {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false)
  const { currentOrderItem, currentRestaurant } = useUser()

  const filterOrder = currentOrderItem.filter((order) => {
    return MenuRestaurantData.some((menu) => {
      return menu.id === order.menu_id
    })
  })

  return (
    <PopUpModal
      closePopUp={togglePopUp}
      className=" w-[50%] flex flex-col gap-5 p-5 rounded-md bg-white"
    >
      <h2 className="m-0 place-self-start">Order</h2>

      {filterOrder.length !== 0 ? (
        filterOrder.map((order) => {
          const menuData = MenuRestaurantData.find((menu) => {
            return menu.id == order.menu_id
          })

          return (
            <CartChildModal
              key={order.id}
              order_id={order.id}
              quantity={order.quantity}
              {...menuData}
            />
          )
        })
      ) : (
        <div>Empty</div>
      )}
      <div>
        <p className="text-secondary text-[13px]">TOTAL PRICE</p>
        <p className="m-0">Rp {1000}</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-secondary text-[13px] ">USER BALANCE</p>
          <p className="m-0">Rp {10000}</p>
        </div>
        <button
          onClick={() => {
            setIsShowProfile(true)
          }}
          className="btn-secondary "
        >
          ADD BALANCE
        </button>
      </div>

      <button className="btn-primary w-full rounded-md">MAKE PAYMENT</button>

      {isShowProfile && (
        <ProfileModal
          noLogOutButton={true}
          togglePopUp={() => {
            setIsShowProfile(false)
          }}
        />
      )}
    </PopUpModal>
  )
}

export default CartModal
