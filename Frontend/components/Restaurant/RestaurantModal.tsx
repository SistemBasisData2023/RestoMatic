import StarRating from '@components/Star Rating/StarRating'
import { useUser } from '@context/UserContext'
import { Restaurant_Props } from '@interfaces/index'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const RestaurantModal = ({ rating = 3, ...props }: Restaurant_Props) => {
  const router = useRouter()
  const { ChangeCurrentRestaurant } = useUser()
  const HandleClick = () => {
    ChangeCurrentRestaurant(props)
    router.push({
      pathname: `/restaurant/${props.id}`,
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
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/1200px-McDonald%27s_logo.svg.png'
          }
          alt="Restaurant Picture"
        />
        <div className="flex flex-col">
          <h2>{props.name}</h2>
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
