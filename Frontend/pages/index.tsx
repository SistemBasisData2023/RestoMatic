import { samplePelanggan } from '@utils/dummy-data'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faFilter } from '@fortawesome/free-solid-svg-icons'
import { RestaurantModal } from '@components/index'
import { SampleRestaurant } from '@utils/dummy-data'
import SearchBar from '@components/SearchBar/SearchBar'

const HomePage: NextPage = () => {
  const router = useRouter()
  const pelanggan = samplePelanggan[0]
  return (
    <div className="w-full h-full bg-light-80 p-8 flex flex-col gap-4">
      <div className="flex gap-3 justify-end  items-center">
        <div className="flex gap-2 bg-slate-400 rounded-md p-2 cursor-pointer hover:scale-105 duration-300">
          <p className="m-0">{pelanggan.username}</p>
          <p className="m-0">Rp {pelanggan.balance}</p>
        </div>
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-125 duration-300"
          icon={faCartShopping}
          size="lg"
        />
      </div>
      <h1 className="m-0 text-6xl w-fit mx-auto text-dark-100 pb-6">
        Restomatic
      </h1>
      <div className="flex justify-between items-center relative">
        <SearchBar />
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-125 duration-300"
          icon={faFilter}
          size="lg"
        />
      </div>
      <h2>Restaurants</h2>
      <div className="flex flex-col gap-6">
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
