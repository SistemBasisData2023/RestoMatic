import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '@components/SearchBar/SearchBar'
import Image from 'next/image'
import StarRating from '@components/Star Rating/StarRating'
import MenuModal from '@components/Menu/MenuModal'
import CartModal from '@components/Cart/CartModal'
import { useUser } from '@context/UserContext'
import {
  BuildResponse,
  Menu_Props,
  Restaurant_Props,
  Reviews_Props,
} from '@interfaces/index'
import { GetServerSideProps, NextPage } from 'next'
import { Button } from '@components/index'
import { ReviewModal } from '@components/Review/ReviewModal'
import { GET_MENURESTAURANT, GET_RESTAURANTREVIEW } from '@utils/APIs'
import RestaurantReview from '@components/Review/RestaurantReview'
type Props = {
  menus: Menu_Props[]
  reviews: Reviews_Props[]
}
const Restaurant: NextPage<Props> = ({ menus, reviews }) => {
  const router = useRouter()
  const { currentRestaurant, user } = useUser()
  const [currentViewMenu, setCurrentViewMenu] = useState<boolean>(true)
  const [menuData, setMenuData] = useState<Menu_Props[]>(menus)
  const [showCart, setShowCart] = useState<boolean>(false)

  useEffect(() => {
    if (currentRestaurant === null)
      router.push('/login', undefined, { shallow: true })
  }, [])

  const rating = currentRestaurant.average_rating
    ? currentRestaurant.average_rating
    : 0

  const MenuModals = (
    <div>
      <SearchBar
        constantData={menus}
        setState={setMenuData}
        className="mb-5"
        placeholder="Search your menu"
      />
      {menuData.length !== 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 ">
          {menuData.map(({ ...props }) => {
            return <MenuModal {...props} />
          })}
        </div>
      ) : (
        <h2 className="text-center ">Menus are empty</h2>
      )}
    </div>
  )

  return (
    <div className="relative flex flex-col h-full min-h-screen px-8 pt-5 pb-8 border rounded-lg bg-light-80">
      <div className="sticky top-0 z-50 flex items-center justify-between pt-2">
        <div
          onClick={() =>
            router.push({
              pathname: '/',
              query: {
                id: user.id,
              },
            })
          }
          className="flex items-center gap-5 cursor-pointer "
        >
          <FontAwesomeIcon
            className="duration-300 cursor-pointer text-primary-120 hover:scale-125"
            icon={faArrowLeft}
            size="lg"
          />
        </div>
        <Button
          onClick={() => setShowCart(true)}
          className="flex items-center justify-center gap-2 p-0 px-2 border-none rounded-md cursor-pointer"
        >
          <FontAwesomeIcon
            className="duration-300 bg-transparent text-primary-60 "
            icon={faShoppingCart}
            size="xl"
          />
          <p>ORDER</p>
        </Button>
      </div>

      <div className="flex gap-10 mt-2 ">
        <div className="overflow-hidden rounded-xl">
          <Image
            width={150}
            height={150}
            src={currentRestaurant.image}
            alt="Restaurant Picture"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="m-0">{currentRestaurant.name}</h1>
          <div className="flex items-center gap-3 ">
            <StarRating ratingAverage={rating} />
            <p className="m-0">{rating}</p>
          </div>
          <h3 className="m-0 font-normal">{currentRestaurant.description}</h3>
        </div>
      </div>

      <div className="flex gap-5 mt-3 mb-5">
        <button
          className={`btn-primary rounded-md px-3 ${
            !currentViewMenu && 'bg-[#CBCBCB] text-black'
          }`}
          onClick={() => setCurrentViewMenu(true)}
        >
          Menu
        </button>
        <button
          className={`btn-primary rounded-md px-3 ${
            currentViewMenu && 'bg-[#CBCBCB] text-black'
          }`}
          onClick={() => setCurrentViewMenu(false)}
        >
          Review
        </button>
      </div>
      {currentViewMenu ? MenuModals : <RestaurantReview reviews={reviews} />}
      {showCart && (
        <CartModal
          MenuRestaurantData={menus}
          togglePopUp={() => setShowCart(false)}
        />
      )}
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const restaurant_id = context.params.id
  const menus: Menu_Props[] = (await GET_MENURESTAURANT(restaurant_id)).data
  let reviews: Reviews_Props[] = []
  const reviewRespondsData = await (
    await GET_RESTAURANTREVIEW(restaurant_id)
  ).data

  if (reviewRespondsData != undefined || reviewRespondsData != null)
    reviews = reviewRespondsData

  return {
    props: {
      menus,
      reviews,
    },
  }
}

export default Restaurant
