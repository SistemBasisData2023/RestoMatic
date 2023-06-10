import { Items_Props } from '@interfaces/index'
import React from 'react'
type Props = {
  item: Items_Props
}

const OrderItemChild = ({ item }: Props) => {
  return (
    <div className="flex justify-between">
      <p className="m-0 font-semibold ">
        {item.quantity}x {item.name}
      </p>
      <p className="m-0 font-semibold">Rp {item.price * item.quantity}</p>
    </div>
  )
}

export default OrderItemChild
