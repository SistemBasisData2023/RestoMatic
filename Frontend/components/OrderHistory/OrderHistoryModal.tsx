import React from 'react'
import { PopUpModal } from '..'
import { OrderHistory_JSON } from '@interfaces/index'
import OrderHistoryChild from './OrderHistoryChild'
import { GetServerSideProps, NextPage } from 'next'
import { useUser } from '@context/UserContext'
import { GET_CUSTOMERORDER } from '@utils/APIs'

type Props = {
  togglePopUp: () => void
  customer_orders: OrderHistory_JSON
}

const OrderHistoryModal: NextPage<Props> = ({
  togglePopUp,
  customer_orders,
}) => {
  console.log(`index: ${JSON.stringify(customer_orders)}`)
  return (
    <PopUpModal className="" closePopUp={togglePopUp}>
      <h2>Order History</h2>
      {customer_orders.orders.map((order) => {
        return <OrderHistoryChild order={order} />
      })}
    </PopUpModal>
  )
}

export default OrderHistoryModal
