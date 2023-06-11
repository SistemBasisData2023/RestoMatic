import React from 'react'
import { PopUpModal } from '..'
import { OrderHistory_JSON } from '@interfaces/index'
import OrderHistoryChild from './OrderHistoryChild'
import { NextPage } from 'next'

type Props = {
  togglePopUp: () => void
  customer_orders: OrderHistory_JSON
}

const OrderHistoryModal: NextPage<Props> = ({
  togglePopUp,
  customer_orders,
}) => {
  return (
    <PopUpModal
      className="p-4 w-[90%] sm:w-[57%] transition-all"
      closePopUp={togglePopUp}
    >
      <h1 className="mb-2 text-center">Order History</h1>
      {customer_orders != null && customer_orders.orders.length != 0 ? (
        <div className="flex flex-col gap-0 ">
          {customer_orders.orders.map((order) => {
            return <OrderHistoryChild key={order.order_id} order={order} />
          })}
        </div>
      ) : (
        <h2 className="mt-10 text-center">Order history is empty</h2>
      )}
    </PopUpModal>
  )
}

export default OrderHistoryModal
