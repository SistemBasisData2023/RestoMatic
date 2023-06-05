import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '@components/SearchBar/SearchBar'
import Image from 'next/image'
import StarRating from '@components/Star Rating/StarRating'
import { SampleMenu } from '@utils/dummy-data'
import MenuModal from '@components/Menu/MenuModal'
import CartModal from '@components/Cart/CartModal'
import { useUser } from '@context/UserContext'

const Restaurant = () => {
  const router = useRouter()
  const { currentRestaurant } = useUser()
  const [currentViewMenu, setCurrentViewMenu] = useState<boolean>(true)
  const [showCart, setShowCart] = useState<boolean>(false)

  const filteredDataMenu = SampleMenu.filter(({ restaurant_id }) => {
    return restaurant_id == currentRestaurant.id
  })
  const MenuData =
    filteredDataMenu.length !== 0 ? (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 ">
        {filteredDataMenu.map(({ ...props }) => {
          return <MenuModal {...props} />
        })}
      </div>
    ) : (
      <h2 className="text-center ">Menu Masih Kosong</h2>
    )

  const ReviewData = <div className="flex">Review</div>

  const HandleMenuClick = () => {
    setCurrentViewMenu(true)
  }
  const HandleReviewClick = () => {
    setCurrentViewMenu(false)
  }

  const HandleOpenCart = () => {
    setShowCart(true)
  }

  const HandleCloseCart = () => {
    setShowCart(false)
  }

  const HandleBackOnClick = () => {
    router.push('/')
  }
  return (
    <div className="relative flex flex-col h-full min-h-screen px-8 pt-5 pb-8 border rounded-lg bg-light-80">
      <div className="sticky top-0 z-50 flex items-center justify-between pt-2">
        <div className="flex items-center gap-5">
          <FontAwesomeIcon
            className="text-gray-700 duration-300 cursor-pointer  hover:scale-125"
            icon={faArrowLeft}
            onClick={HandleBackOnClick}
            size="lg"
          />
          <SearchBar placeholder="Search your menu" />
        </div>
        <button
          onClick={HandleOpenCart}
          className="p-0 border-none cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-gray-700 duration-300 bg-transparent cursor-pointer  hover:scale-125"
            icon={faShoppingCart}
            size="xl"
          />
        </button>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex items-center gap-10 ">
          <div className="overflow-hidden rounded-xl">
            <Image
              width={150}
              height={150}
              src={currentRestaurant.picture}
              alt="Restaurant Picture"
            />
          </div>

          <div className="flex flex-col">
            <h1>{currentRestaurant.name}</h1>
            <h3 className="font-normal">{currentRestaurant.description}</h3>
          </div>
        </div>
        <div className="flex items-start gap-4 ">
          <StarRating ratingAverage={currentRestaurant.rating} />
          <p className="m-0">{currentRestaurant.rating}</p>
        </div>
      </div>

      <div className="flex gap-5 mb-5">
        <button className="p-0 mt-6 border-none" onClick={HandleMenuClick}>
          <h2
            className={`m-0 cursor-pointer hover:underline ${
              currentViewMenu && 'underline'
            }`}
          >
            Menu
          </h2>
        </button>
        <button className="p-0 mt-6 border-none" onClick={HandleReviewClick}>
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
      {showCart && (
        <CartModal
          MenuRestaurantData={filteredDataMenu}
          togglePopUp={HandleCloseCart}
        />
      )}
    </div>
  )
}

export default Restaurant
