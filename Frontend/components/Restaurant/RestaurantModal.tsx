import StarRating from '@components/Star Rating/StarRating'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      className="flex justify-between border border-solid rounded-lg p-5 cursor-pointer hover:-translate-y-2 duration-300"
    >
      <div className="flex gap-10 items-center">
        <Image
          width={130}
          height={130}
          src={picture}
          alt="Restaurant Picture"
        />
        <div className="flex flex-col">
          <p>{name}</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex items-start gap-4 ">
        <p className="m-0">{rating}</p>
        <StarRating ratingAverage={rating} />
      </div>
    </div>
  )
}

export { RestaurantModal }
