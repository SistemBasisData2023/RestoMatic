import StarRating from '@components/Star Rating/StarRating'
import {
  faMinus,
  faPlus,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu_Props } from '@interfaces/index'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@components/index'

const MenuModal = ({ ...props }: Menu_Props) => {
  const [quantity, setQuanity] = useState<number>(0)
  const DecrementHandler = () => {
    setQuanity((value) => {
      if (value === 0) return 0
      return value - 1
    })
  }
  const IncrementHandler = () => {
    setQuanity((value) => {
      return value + 1
    })
  }
  return (
    <div className="flex  flex-col gap-4 border border-solid p-5 rounded-md shadow-xl border-green-800">
      <div className="rounded-xl overflow-hidden mx-auto">
        <Image width={150} height={150} src={props.picture} alt="Gambar ayam" />
      </div>

      <div className="flex flex-col justify-center items-center gap-5 mt-3 mb-5">
        <h2 className="m-0">{props.name}</h2>
        <p className="m-0">{props.description}</p>
        <h4 className="m-0">Rp {props.cost}</h4>
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <StarRating ratingAverage={2} />
        <p className="m-0">{2}</p>
      </div>
      <div className="flex  justify-center items-center gap-5 mt-4">
        <button
          className="border-none  cursor-pointer"
          onClick={DecrementHandler}
        >
          <FontAwesomeIcon
            size="lg"
            className="cursor-pointer hover:hover:scale-125 duration-300"
            icon={faMinus}
          />
        </button>
        <p className="m-0 text-xl">{quantity}</p>
        <button
          className="border-none cursor-pointer "
          onClick={IncrementHandler}
        >
          <FontAwesomeIcon
            size="lg"
            className="cursor-pointer hover:hover:scale-125 duration-300"
            icon={faPlus}
          />
        </button>
      </div>

      <Button className="mx-auto w-[75%]">
        Add To Cart
        <FontAwesomeIcon className="ml-2" icon={faShoppingCart} size="lg" />
      </Button>
    </div>
  )
}

export default MenuModal
