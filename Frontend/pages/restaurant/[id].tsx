import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faL,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import SearchBar from '@components/SearchBar/SearchBar'
import Image from 'next/image'
import StarRating from '@components/Star Rating/StarRating'
import { SampleMenu } from '@utils/dummy-data'
import MenuModal from '@components/Restaurant/MenuModal'

const Restaurant = () => {
  const router = useRouter()

  const [currentViewMenu, setCurrentViewMenu] = useState<boolean>(true)
  const {
    query: { id, name, description, picture, rating },
  } = router
  const filteredData = SampleMenu.filter(({ restaurant_id }) => {
    return restaurant_id === parseInt(id)
  })

  const MenuData =
    filteredData.length !== 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {filteredData.map(({ ...props }) => {
          return <MenuModal {...props} />
        })}
      </div>
    ) : (
      <h2 className=" text-center">Menu Masih Kosong</h2>
    )

  const ReviewData = <div className="flex">Review</div>
  const HandleMenuClick = () => {
    setCurrentViewMenu((value) => {
      return (value = true)
    })
  }
  const HandleReviewClick = () => {
    setCurrentViewMenu((value) => {
      return (value = false)
    })
  }

  const HandleBackOnClick = () => {
    router.push('/')
  }
  return (
    <div className="flex flex-col min-h-screen h-full  border relative rounded-lg px-8 pb-8 pt-5 bg-light-80">
      <div className="flex items-center justify-between sticky top-0 z-50 pt-2">
        <div className="flex items-center gap-5">
          <FontAwesomeIcon
            className="  cursor-pointer hover:scale-125 duration-300 text-gray-700"
            icon={faArrowLeft}
            onClick={HandleBackOnClick}
            size="lg"
          />
          <SearchBar placeholder="Search your menu" />
        </div>
        <button className="border-none cursor-pointer p-0">
          <FontAwesomeIcon
            className=" bg-transparent cursor-pointer hover:scale-125 duration-300 text-gray-700"
            icon={faShoppingCart}
            size="xl"
          />
        </button>
      </div>

      <div className="flex mt-5 justify-between">
        <div className="flex gap-10 items-center ">
          <div className="rounded-xl overflow-hidden">
            <Image
              width={150}
              height={150}
              src={picture}
              alt="Restaurant Picture"
            />
          </div>

          <div className="flex flex-col">
            <h1>{name}</h1>
            <h3 className="font-normal">{description}</h3>
          </div>
        </div>
        <div className="flex items-start gap-4 ">
          <StarRating ratingAverage={rating} />
          <p className="m-0">{rating}</p>
        </div>
      </div>

      <div className="flex gap-5 mb-5">
        <button className="mt-6 p-0 border-none" onClick={HandleMenuClick}>
          <h2
            className={`m-0 cursor-pointer hover:underline ${
              currentViewMenu && 'underline'
            }`}
          >
            Menu
          </h2>
        </button>
        <button className="mt-6 p-0 border-none" onClick={HandleReviewClick}>
          <h2
            className={`m-0 cursor-pointer hover:underline ${
              !currentViewMenu && 'underline'
            }`}
          >
            Review
          </h2>
        </button>
      </div>
      {currentViewMenu ? MenuData : ReviewData}
    </div>
  )
}

export default Restaurant
