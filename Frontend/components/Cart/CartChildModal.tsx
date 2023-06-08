import { useUser } from '@context/UserContext'
import { faMinus, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu_Props } from '@interfaces/index'
import Image from 'next/image'
import React from 'react'
import { Button } from '..'
import { DotEvery3Decimals } from '@utils/functions'
interface Props extends Menu_Props {
  quantity: number
  order_id: number
}
const CartChildModal = ({ order_id, quantity, ...props }: Props) => {
  const { IncrementQuantity, DecrementQuantity } = useUser()
  const IncrementHandler = () => {
    IncrementQuantity(order_id)
  }
  const DecrementHandler = () => {
    DecrementQuantity(order_id)
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex ">
        <div className="rounded-xl overflow-hidden ">
          <Image
            width={100}
            height={100}
            src={props.image}
            alt="Gambar Makanan / Minuman"
          />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h3 className="m-0 font-bold">{props.name}</h3>
          <p className="m-0 font-bold">Total: {quantity}</p>
          <p className="m-0 font-bold">Rp {DotEvery3Decimals(props.price)}</p>
        </div>
      </div>

      <button className="btn-secondary ">
        <FontAwesomeIcon className="fill-inherit mr-1" icon={faPencil} />
        EDIT
      </button>
    </div>
  )
}

export default CartChildModal
