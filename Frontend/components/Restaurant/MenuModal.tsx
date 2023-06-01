import { Menu_Props } from '@interfaces/index'
import Image from 'next/image'
import React from 'react'

const MenuModal = ({ ...props }: Menu_Props) => {
  return (
    <div className="flex flex-col gap-4 border border-solid p-5 rounded-md">
      <Image
        width={150}
        height={150}
        src={props.picture}
        alt="Gambar ayam"
        className="mx-auto"
      />
      <h2 className="mx-auto">{props.name}</h2>
      <div>
        <h3 className="mt-0">Deskripsi</h3>
        <p className="mt-0">{props.description}</p>
      </div>

      <h4 className="my-0">Rp {props.cost}</h4>
      <button className="rounded-[18px] w-[80%] mx-auto mt-5 p-2 cursor-pointer hover:bg-peach-100 hover:text-white transition-all duration-300">
        Order
      </button>
    </div>
  )
}

export default MenuModal
