import { PopUpModal } from '@components/index'
import React from 'react'
import CartChildModal from './CartChildModal'
import { useUser } from '@context/UserContext'
import { Menu_Props, Restaurant_Props } from '@interfaces/index'
import Image from 'next/image'
import { Button } from '..'

type Props = {
  togglePopUp: () => void
  MenuRestaurantData: Menu_Props[]
  restaurant?: Restaurant_Props
}

const CartModal = ({ togglePopUp, MenuRestaurantData }: Props) => {
  const { currentOrderItem, currentRestaurant } = useUser()

  const filterOrder = currentOrderItem.filter((order) => {
    return MenuRestaurantData.some((menu) => {
      return menu.id === order.menu_id
    })
  })

  console.log(filterOrder)

  return (
    <PopUpModal
      closePopUp={togglePopUp}
      className=" w-[30%] flex flex-col gap-5 p-5 rounded-md bg-white items-center"
    >
      <h2 className="m-0">Cart</h2>
      <div className="flex items-center w-full gap-10">
        <div>
          <Image
            width={130}
            height={130}
            src={currentRestaurant.picture}
            alt="Restaurant Picture"
          />
        </div>
        <h2>{currentRestaurant.name}</h2>
      </div>

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
      <Button className="w-[70%]">Order</Button>
    </PopUpModal>
  )
}

export default CartModal
