import { samplePelanggan } from '@utils/dummy-data'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faMagnifyingGlass,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { RestaurantModal } from '@components/index'
import { SampleRestaurant } from '@utils/dummy-data'

const HomePage: NextPage = () => {
  const router = useRouter()
  const pelanggan = samplePelanggan[0]
  return (
    <div className="w-screen h-screen bg-light-80 px-8 flex flex-col gap-4">
      <div className="flex gap-3 justify-end mt-3 items-center">
        <div className="flex gap-2 bg-slate-400 rounded-md p-2 cursor-pointer">
          <p className="m-0">{pelanggan.username}</p>
          <p className="m-0">Rp {pelanggan.saldo}</p>
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
      <div className="flex justify-between items-center  relative">
        <div className="relative flex items-center">
          <FontAwesomeIcon
            className="absolute pl-2 "
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            className="border-none rounded-[14px] py-2 pl-8 h-[2.5rem] w-[20rem]"
          />
        </div>
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-125 duration-300"
          icon={faFilter}
          size="lg"
        />
      </div>
      <h2>Restaurants</h2>
      <div className="flex flex-col gap-6">
        {SampleRestaurant.map(({ id, nama, deskripsi, gambar, rating }) => {
          return (
            <RestaurantModal
              key={id}
              nama={nama}
              deskripsi={deskripsi}
              gambar={gambar}
              rating={rating}
            />
          )
        })}
      </div>
    </div>
  )
}
export default HomePage
