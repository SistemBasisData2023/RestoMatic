import { samplePelanggan } from '@utils/dummy-data'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faClockRotateLeft,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { RestaurantModal } from '@components/index'
import { SampleRestaurant } from '@utils/dummy-data'
import SearchBar from '@components/SearchBar/SearchBar'

const HomePage: NextPage = () => {
  const router = useRouter()
  const pelanggan = samplePelanggan[0]
  return (
    <div className="w-full min-h-screen bg-light-80 px-8 pb-8 pt-5 flex flex-col gap-4">
      <div className="flex gap-5 justify-end items-center sticky top-0 z-50 pt-2">
        <div className="flex gap-2 bg-slate-400 rounded-md p-2 cursor-pointer hover:scale-105 duration-300">
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
      <div className="flex justify-between items-center relative">
        <SearchBar placeholder="Search your restaurant" />
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-125 duration-300 text-gray-700"
          icon={faFilter}
          size="lg"
        />
      </div>
      <h2 className="text-gray-800">Restaurants</h2>
      <div className="grid grid-cols-5 gap-10 ">
        {SampleRestaurant.map(
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
  )
}
export default HomePage
