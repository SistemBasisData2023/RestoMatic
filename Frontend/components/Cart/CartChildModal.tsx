import { useUser } from '@context/UserContext'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
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
    <div className="w-full flex p-4 justify-between">
      <div>
        <h3>{props.name}</h3>
        <p>Rp {DotEvery3Decimals(props.cost)}</p>
      </div>
      <div className="flex flex-col">
        <div className="rounded-xl overflow-hidden mx-auto">
          <Image
            width={150}
            height={150}
            src={props.picture}
            alt="Gambar Makanan / Minuman"
          />
        </div>
        <div className="flex  justify-center items-center gap-5 mt-4">
          <Button
            onClick={DecrementHandler}
            className=" bg-inherit rounded-[50%] cursor-pointer hover:hover:scale-110 duration-300"
          >
            <FontAwesomeIcon
              size="lg"
              className="cursor-pointer"
              icon={faMinus}
            />
          </Button>
          <p className="m-0 text-xl">{quantity}</p>
          <Button
            onClick={IncrementHandler}
            className=" bg-inherit rounded-[50%] cursor-pointer hover:hover:scale-110 duration-300"
          >
            <FontAwesomeIcon
              size="lg"
              className="cursor-pointer "
              icon={faPlus}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartChildModal
