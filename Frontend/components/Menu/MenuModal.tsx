import StarRating from '@components/Star Rating/StarRating'
import {
  faMinus,
  faPlus,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu_Props, Order_Item } from '@interfaces/index'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@components/index'
import { DotEvery3Decimals } from '@utils/functions'
import { useUser } from '@context/UserContext'
import { PopUpModal } from '@components/index'

const MenuModal = ({ ...props }: Menu_Props) => {
  const [showAddedCartModal, setAddedCartModal] = useState<boolean>(false)
  const { AddCurrentItemOrder, currentOrderItem } = useUser()
  const [quantity, setQuantity] = useState<number>(1)
  const DecrementHandler = () => {
    setQuantity((value) => {
      if (value === 1) return 1
      return value - 1
    })
  }
  const IncrementHandler = () => {
    setQuantity((value) => {
      return value + 1
    })
  }

  const PopUpCartHandler = () => {
    setAddedCartModal(false)
  }

  const addToCartHandler = () => {
    const data: Order_Item = {
      id: currentOrderItem.length + 1,
      menu_id: props.id,
      order_id: null,
      quantity: quantity,
    }
    setAddedCartModal(true)
    AddCurrentItemOrder(data)
  }
  return (
    <div className="flex flex-col gap-4 p-5 border border-green-800 border-solid rounded-md shadow-xl">
      <div className="mx-auto overflow-hidden rounded-xl">
        <Image width={150} height={150} src={props.picture} alt="Gambar ayam" />
      </div>

      <div className="flex flex-col items-center justify-center gap-5 mt-3 mb-5">
        <h2 className="m-0">{props.name}</h2>
        <p className="m-0">{props.description}</p>
        <h4 className="m-0">Rp {DotEvery3Decimals(props.cost)}</h4>
      </div>
      <div className="flex items-center justify-center gap-4 ">
        <StarRating ratingAverage={props.rating} />
        <p className="m-0">{props.rating}</p>
      </div>
      <div className="flex items-center justify-center gap-5 mt-4">
        <Button
          className=" bg-inherit rounded-[50%] hover:scale-110 duration-300"
          onClick={DecrementHandler}
        >
          <FontAwesomeIcon
            size="lg"
            className="cursor-pointer"
            icon={faMinus}
          />
        </Button>
        <p className="m-0 text-xl">{quantity}</p>
        <Button
          className=" bg-inherit rounded-[50%]  hover:hover:scale-110 duration-300"
          onClick={IncrementHandler}
        >
          <FontAwesomeIcon
            size="lg"
            className="cursor-pointer "
            icon={faPlus}
          />
        </Button>
      </div>

      <Button onClick={addToCartHandler} className="mx-auto w-[75%] ">
        Add To Cart
        <FontAwesomeIcon className="ml-2" icon={faShoppingCart} size="lg" />
      </Button>
      {showAddedCartModal && (
        <PopUpModal
          className="flex flex-col p-10 rounded-md bg-light-80"
          closePopUp={PopUpCartHandler}
        >
          <h2>Item has been added to cart</h2>
        </PopUpModal>
      )}
    </div>
  )
}

export default MenuModal
