import React from 'react'
type RestaurantProps = {
  nama: string
  gambar: string
  deskripsi: string
  rating: number
}
const RestaurantModal = ({
  nama,
  deskripsi,
  gambar,
  rating,
}: RestaurantProps) => {
  return (
    <div className="flex justify-between border border-solid rounded-lg p-5 cursor-pointer hover:-translate-y-2 duration-300">
      <div className="flex gap-10 items-center">
        <h2 className="m-0">{gambar}</h2>
        <div className="flex flex-col">
          <p>{nama}</p>
          <p>{deskripsi}</p>
        </div>
      </div>
      <div className="flex items-start gap-4 ">
        <p className="m-0">{rating}</p>
        <p className="m-0">stars</p>
      </div>
    </div>
  )
}

export { RestaurantModal }
