// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type Pelanggan = {
  id: number
  username: string
  password: string
  email: string
  saldo: number
}

export type Restaurant = {
  id: number
  gambar: string
  nama: string
  deskripsi: Text
  rating: number
  review: Text
}

export type Makanan = {
  id: number
  gambar: string
  nama: string
  deskripsi: Text
  rating: number
  restaurant_id: number
}

export type Minuman = {
  id: number
  gambar: string
  nama: string
  deskripsi: Text
  rating: number
  restaurant_id: number
}

export type Order = {
  id: number
  restaurant_id: number
  makanan_id: number[]
  minuman_id: number[]
  saldo_pelanggan: number
  total_harga: number
}

export type LoginFormValue = {
  email: string
  password: string
}

export type SignUpFormValue = {
  username: string
  email: string
  password: string
}
