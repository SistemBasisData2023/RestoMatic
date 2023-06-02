import PopUpModal from '@components/Pop up/PopUpModal'
import React from 'react'
import CartChildModal from './CartChildModal'
import { useUser } from '@context/UserContext'
import { Menu_Props } from '@interfaces/index'

type Props = {
  togglePopUp: () => void
  MenuRestaurantData: Menu_Props[]
}

const CartModal = ({ togglePopUp, MenuRestaurantData }: Props) => {
  const { currentOrderItem } = useUser()

  const filterOrder = currentOrderItem.filter((order) => {
    return MenuRestaurantData.some((menu) => {
      return menu.id === order.menu_id
    })
  })

  console.log(filterOrder)

  return (
    <PopUpModal
      togglePopUp={togglePopUp}
      className=" w-[30%] flex flex-col gap-5 p-5 rounded-md bg-white items-center"
    >
      <h2 className="m-0">Cart</h2>
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
    </PopUpModal>
  )
}

export default CartModal
