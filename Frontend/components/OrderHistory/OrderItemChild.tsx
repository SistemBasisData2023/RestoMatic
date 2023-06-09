import { Items_Props } from '@interfaces/index'
import React from 'react'
type Props = {
  item: Items_Props
}

const OrderItemChild = ({ item }: Props) => {
  return <div>{item.name}</div>
}

export default OrderItemChild
