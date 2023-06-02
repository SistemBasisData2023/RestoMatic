import StarRating from '@components/Star Rating/StarRating'
import { Restaurant_Props } from '@interfaces/index'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const RestaurantModal = ({
  id,
  name,
  description,
  picture,
  rating,
}: Restaurant_Props) => {
  const router = useRouter()
  const HandleClick = () => {
    router.push({
      pathname: `/restaurant/${id}`,
      query: {
        id,
        name,
        description,
        picture,
        rating,
      },
    })
  }
  return (
    <div
      onClick={HandleClick}
      className="flex w-full justify-center border border-solid border-gray-600 shadow-xl rounded-lg p-5 cursor-pointer hover:-translate-y-2 duration-300"
    >
      <div className="flex flex-col gap-5 items-center">
        <Image
          width={130}
          height={130}
          src={picture}
          alt="Restaurant Picture"
        />
        <div className="flex flex-col">
          <h2>{name}</h2>
        </div>
        <div className="flex items-start gap-4 ">
          <StarRating ratingAverage={rating} />
          <p className="m-0">{rating}</p>
        </div>
      </div>
    </div>
  )
}

export { RestaurantModal }
