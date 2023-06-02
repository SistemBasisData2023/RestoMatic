import { samplePelanggan } from '@utils/dummy-data'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faFilter } from '@fortawesome/free-solid-svg-icons'
import { ProfileModal, RestaurantModal } from '@components/index'
import { SampleRestaurant } from '@utils/dummy-data'
import SearchBar from '@components/SearchBar/SearchBar'
import { Button } from '@components/index'
import { useEffect, useState } from 'react'
import { Restaurant_Props } from '@interfaces/index'

const HomePage: NextPage = () => {
  const router = useRouter()
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false)
  const [restaurantData, setRestaurantData] =
    useState<Restaurant_Props[]>(SampleRestaurant)

  const HandleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setIsShowProfile(true)
  }
  const HandleCloseProfile = (event: React.MouseEvent<HTMLElement>) => {
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

  const pelanggan = samplePelanggan[0]
  return (
    <div className="min-h-screen h-full  bg-light-80 px-8 pb-8 pt-5 flex flex-col gap-4 ">
      <div className="flex gap-5 justify-end items-center sticky top-0 z-50 pt-2">
        <div
          onClick={HandleOpenProfile}
          className="flex gap-2 bg-gray-500 text-white rounded-md p-2 cursor-pointer hover:scale-105 duration-300"
        >
          <p className="m-0">{pelanggan.username}</p>
          <p className="m-0">Rp {pelanggan.balance}</p>
        </div>
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-125 duration-300 text-gray-700"
          icon={faClockRotateLeft}
          size="lg"
        />
      </div>
      <h1 className="m-0 text-6xl w-fit mx-auto text-gray-800 pb-6">
        Restomatic
      </h1>
      <div className="flex flex-col gap-5  md:flex-row md:justify-between md:items-center ">
        <SearchBar placeholder="Search your restaurant" />
        <div className="flex items-center gap-3">
          <Button onClick={HandleSortRatingDesc} className="px-3">
            Rating Tertinggi
          </Button>
          <Button onClick={HandleSortRatingAsc} className="px-3">
            Rating Terendah
          </Button>
          <FontAwesomeIcon
            className=" text-gray-700"
            icon={faFilter}
            size="lg"
          />
        </div>
      </div>
      <h2 className="text-gray-800">Restaurants</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
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
      {isShowProfile && <ProfileModal togglePopUp={HandleCloseProfile} />}
    </div>
  )
}
export default HomePage
