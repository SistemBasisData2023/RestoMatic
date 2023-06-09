import { Orders_Props } from '@interfaces/index'
import React from 'react'
import OrderItemChild from './OrderItemChild'
type Props = {
  order: Orders_Props
}
const OrderHistoryChild = ({ order }: Props) => {
  return (
    <div>
      <div>Image</div>
      <div>
        <h2>{order.restaurant_name}</h2>
        <p>{order.address}</p>
        <p>{order.created_at}</p>
        <div>
          {order.items.map((item) => {
            return <OrderItemChild item={item} />
          })}
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryChild
