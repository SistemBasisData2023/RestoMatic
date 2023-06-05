import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClockRotateLeft,
  faFilter,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { ProfileModal, RestaurantModal } from '@components/index'
import { SampleRestaurant } from '@utils/dummy-data'
import SearchBar from '@components/SearchBar/SearchBar'
import { Button } from '@components/index'
import { useEffect, useState } from 'react'
import { Restaurant_Props } from '@interfaces/index'
import { useUser } from '@context/UserContext'

const HomePage: NextPage = () => {
  const { user } = useUser()
  const router = useRouter()
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false)
  const [restaurantData, setRestaurantData] =
    useState<Restaurant_Props[]>(SampleRestaurant)

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [])

  const HandleOpenProfile = () => {
    setIsShowProfile(true)
  }
  const HandleCloseProfile = () => {
    setIsShowProfile(false)
  }

  const HandleSortRatingAsc = () => {
    const sorted = [...restaurantData].sort((a, b) => {
      return a.rating - b.rating
    })
    setRestaurantData(sorted)
  }

  const HandleSortRatingDesc = () => {
    const sorted = [...restaurantData].sort((a, b) => {
      return b.rating - a.rating
    })
    setRestaurantData(sorted)
  }

  return (
    <div className="flex flex-col h-full min-h-screen p-10 bg-primary-60 py-7 gap-7 ">
      <div className="flex justify-between">
        <div>
          <h2 className="m-0 text-5xl w-fit text-primary-100 ">RESTO</h2>
          <h2 className="m-0 text-5xl w-fit text-primary-120 ">MATIC</h2>
        </div>
        <div className="sticky top-0 z-50 flex items-center justify-end gap-5 pt-2">
          <div
            onClick={HandleOpenProfile}
            className="flex gap-3 p-2 px-4 duration-300 rounded-md cursor-pointer bg-primary-100 hover:bg-primary-120 text-primary-60 hover:scale-105"
          >
            <FontAwesomeIcon className="" icon={faUser} size="lg" />
            {user && <p className="m-0">{user.username}</p>}
          </div>
          <FontAwesomeIcon
            className="text-gray-700 duration-300 cursor-pointer hover:scale-125"
            icon={faClockRotateLeft}
            size="lg"
          />
        </div>
      </div>

      <div className="flex flex-col px-10 mt-5 gap-7">
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center ">
          <SearchBar placeholder="Search your restaurant" />
          <div className="flex items-center gap-3">
            <Button onClick={HandleSortRatingDesc} className="px-3">
              Rating Tertinggi
            </Button>
            <Button onClick={HandleSortRatingAsc} className="px-3">
              Rating Terendah
            </Button>
            <FontAwesomeIcon
              className="text-gray-700 "
              icon={faFilter}
              size="lg"
            />
          </div>
        </div>
        <h2 className="m-0 text-gray-800">List of Restaurants</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 ">
          {restaurantData !== null &&
            restaurantData.map(
              ({ description, id, name, picture, rating, review }) => {
                return (
                  <RestaurantModal
                    key={id}
                    description={description}
                    id={id}
                    name={name}
                    picture={picture}
                    rating={rating}
                    review={review}
                  />
                )
              }
            )}
        </div>
      </div>

      {isShowProfile && <ProfileModal togglePopUp={HandleCloseProfile} />}
    </div>
  )
}
export default HomePage
