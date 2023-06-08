import { PopUpModal, ProfileModal } from '@components/index'
import React, { useState } from 'react'
import CartChildModal from './CartChildModal'
import { useUser } from '@context/UserContext'
import { BuildResponse, Menu_Props, Restaurant_Props } from '@interfaces/index'
import Image from 'next/image'
import { Button } from '..'
import { useRouter } from 'next/router'

type Props = {
  togglePopUp: () => void
  MenuRestaurantData: Menu_Props[]
  restaurant?: Restaurant_Props
}
type Order_JSON = {
  customer_id: number
  restaurant_id: number
  items: Menu_JSON[]
}
type Menu_JSON = {
  menu_id: number
  quantity: number
}

const CartModal = ({ togglePopUp, MenuRestaurantData }: Props) => {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false)
  const { currentOrderItem, currentRestaurant, user } = useUser()
  const [responseMessage, setResponseMessage] = useState<string>(null)

  const [isLoading, setLoading] = useState(false)

  const filterOrder = currentOrderItem.filter((order) => {
    return MenuRestaurantData.some((menu) => {
      return menu.id === order.menu_id
    })
  })

  const sumTotal = filterOrder.reduce((prev, current) => {
    return prev + current.price * current.quantity
  }, 0)

  const handlePayment = async () => {
    const data: Order_JSON = {
      customer_id: user.id,
      restaurant_id: currentRestaurant.id,
      items: filterOrder.map(({ menu_id, quantity }) => {
        return {
          menu_id,
          quantity,
        }
      }),
    }
    console.log(data)
    setLoading(true)
    // const res = await fetch(`http://localhost:4000/api/orders`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })

    // if (!res.ok) {
    //   throw new Error('Error at making a payment')
    // }

    // const bodyResponse: BuildResponse = await res.json()
    // setResponseMessage(bodyResponse.message)
  }

  return (
    <PopUpModal
      closePopUp={togglePopUp}
      className=" w-[50%] flex flex-col gap-5 p-5 rounded-md bg-white"
    >
      <h2 className="m-0 place-self-start font-bold text-[25px]">Order</h2>
      {filterOrder.length !== 0 ? (
        filterOrder.map((order) => {
          const menuData = MenuRestaurantData.find((menu) => {
            return menu.id == order.menu_id
          })

          return (
            <>
              <CartChildModal
                key={order.id}
                order_id={order.id}
                quantity={order.quantity}
                {...menuData}
              />
            </>
          )
        })
      ) : (
        <h1 className=" mx-auto font-bold">Order is empty</h1>
      )}
      {filterOrder.length !== 0 && (
        <>
          <div>
            <p className="text-secondary text-[13px]">TOTAL PRICE</p>
            <p className="m-0">Rp {sumTotal}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-secondary text-[13px] ">USER BALANCE</p>
              <p className="m-0">Rp {user.balance}</p>
            </div>
            <button
              onClick={() => {
                setIsShowProfile(true)
              }}
              className="btn-secondary"
            >
              ADD BALANCE
            </button>
          </div>
          <div className="flex items-center gap-4">
            <label>Address</label>
            <input
              type="text"
              className="w-[60%] border border-solid rounded-md p-1"
              placeholder="Enter your address"
            />
          </div>
          <button
            onClick={handlePayment}
            className="btn-primary w-full rounded-md"
          >
            MAKE PAYMENT
          </button>

          {isShowProfile && (
            <ProfileModal
              noLogOutButton={true}
              togglePopUp={() => {
                setIsShowProfile(false)
              }}
            />
          )}
        </>
      )}
    </PopUpModal>
  )
}

export default CartModal
