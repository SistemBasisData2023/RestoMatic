import { Orders_Props } from '@interfaces/index'
import React from 'react'
import OrderItemChild from './OrderItemChild'
import { FormatTime } from '@utils/functions'
import Image from 'next/image'
type Props = {
  order: Orders_Props
}
const OrderHistoryChild = ({ order }: Props) => {
  const {
    address,
    created_at,
    items,
    restaurant_image,
    restaurant_name,
    total_price,
  } = order
  return (
    <div className="flex items-center gap-5 py-5 border border-t-0 border-solid border-x-0">
      <div className="">
        <Image
          width={100}
          height={100}
          src={restaurant_image}
          alt="Restaurant picture"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <h2 className="m-0">{restaurant_name}</h2>
        <p className="m-0">{FormatTime(created_at)}</p>
        <p className="m-0 text-">{address}</p>
        <div className="mt-1">
          {items.map((item) => {
            return <OrderItemChild item={item} />
          })}
        </div>

        <div className="flex justify-between mt-1">
          <p className="m-0 text-lg font-bold text-primary-100">Total</p>
          <p className="m-0 text-lg font-bold">Rp {total_price}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryChild
