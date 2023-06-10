import { PopUpModal, ProfileModal } from '@components/index'
import React, { useState, useEffect, useRef } from 'react'
import CartChildModal from './CartChildModal'
import { useUser } from '@context/UserContext'
import {
  BuildResponse,
  Menu_Props,
  Order_JSON,
  Restaurant_Props,
} from '@interfaces/index'
import Image from 'next/image'
import { Button } from '..'
import { useRouter } from 'next/router'
import { SuccessErrorModal } from '@components/Pop up/SuccessErrorModal'
import { GET_CUSTOMER, POST_ORDER } from '@utils/APIs'

type Props = {
  togglePopUp: () => void
  MenuRestaurantData: Menu_Props[]
  restaurant?: Restaurant_Props
}

const CartModal = ({ togglePopUp, MenuRestaurantData }: Props) => {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false)
  const { currentOrderItem, currentRestaurant, user, login } = useUser()

  const [canPay, setCanPay] = useState<boolean>(false)
  const refAddress = useRef(null)

  const [isLoading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>(null)
  const [showSuccessErrorModal, setShowSuccessErrorModal] =
    useState<boolean>(false)
  const [successOrError, setSuccessOrError] = useState<
    'success' | 'error' | null
  >()

  const filterOrder = currentOrderItem.filter((order) => {
    return MenuRestaurantData.some((menu) => {
      return menu.id === order.menu_id
    })
  })

  const sumTotal = filterOrder.reduce((prev, current) => {
    return prev + current.price * current.quantity
  }, 0)

  useEffect(() => {
    if (sumTotal < user.balance) setCanPay(true)
    else setCanPay(false)
  }, [sumTotal, user.balance])

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
      address: refAddress.current.value,
    }

    setLoading(true)
    const bodyResponse: BuildResponse = await POST_ORDER(data)
    setLoading(false)
    setResponseMessage(bodyResponse.message)

    if (bodyResponse.message.includes('successfully')) {
      const bodyResponse: BuildResponse = await GET_CUSTOMER(user.id)
      const { id, email, username, balance } = bodyResponse.data
      login({ id, email, username, balance })
      setSuccessOrError('success')
    } else setSuccessOrError('error')

    setShowSuccessErrorModal(true)
  }

  return (
    <PopUpModal
      closePopUp={togglePopUp}
      disableClickOutside={true}
      className=" w-[50%] flex flex-col gap-5 p-5 px-7 rounded-md bg-white"
    >
      <h2 className="m-0 place-self-start font-bold text-[25px]">Order</h2>
      {filterOrder.length != 0 ? (
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
        <h1 className="mx-auto font-bold ">Order is empty</h1>
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
              <p className={`m-0 ${!canPay && 'text-error-100'}`}>
                Rp {user.balance}
              </p>
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
          <div className="flex flex-col gap-1">
            <label className="text-secondary text-[13px]">Address</label>
            <input
              type="text"
              ref={refAddress}
              className="w-full border-none border p-2 bg-[#E9E9E9] rounded-md"
              placeholder="Enter your address"
              required={true}
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={!canPay}
            className={`btn-primary w-full rounded-md ${
              !canPay && 'opacity-50 cursor-not-allowed'
            }`}
          >
            MAKE PAYMENT
          </button>
          {!canPay && (
            <p className="m-0 mx-auto text-error-100">
              User balance is less than total price
            </p>
          )}

          {isShowProfile && (
            <ProfileModal
              noLogOutButton={true}
              togglePopUp={() => {
                setIsShowProfile(false)
              }}
            />
          )}

          {showSuccessErrorModal && (
            <SuccessErrorModal
              type={successOrError}
              showModal={setShowSuccessErrorModal}
              message={responseMessage}
              className="p-20 py-7"
            />
          )}
        </>
      )}
    </PopUpModal>
  )
}

export default CartModal
