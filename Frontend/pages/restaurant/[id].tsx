import React from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '@components/SearchBar/SearchBar'
import Image from 'next/image'
import StarRating from '@components/Star Rating/StarRating'
import { SampleMenu } from '@utils/dummy-data'
import MenuModal from '@components/Restaurant/MenuModal'
const Restaurant = () => {
  const router = useRouter()
  const {
    query: { id, name, description, picture, rating },
  } = router
  const filteredData = SampleMenu.filter(({ restaurant_id }) => {
    return restaurant_id === parseInt(id)
  })

  const HandleBackOnClick = () => {
    router.push('/')
  }
  return (
    <div className="flex flex-col w-full h-full border relative rounded-lg p-5 bg-light-80">
      <FontAwesomeIcon
        className="absolute top-0 left-0 ml-5 mt-3 cursor-pointer hover:scale-125 duration-300"
        icon={faArrowLeft}
        onClick={HandleBackOnClick}
        size="lg"
      />
      <div className="flex mt-8 justify-between">
        <div className="flex gap-10 items-center">
          <Image
            width={150}
            height={150}
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
      <SearchBar className="mt-5" />
      <h2 className="mt-6">Menu</h2>
      <div className="grid grid-cols-4 gap-5">
        {filteredData.map(({ ...props }) => {
          return <MenuModal {...props} />
        })}
      </div>
    </div>
  )
}

export default Restaurant
