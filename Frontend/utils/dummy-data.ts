import {
  Pelanggan,
  Restaurant,
  Makanan,
  Minuman,
  Order,
} from '@interfaces/index'

export const samplePelanggan: Pelanggan[] = [
  {
    id: 1,
    email: 'seno@gmail.com',
    password: '123',
    saldo: 150,
    username: 'UwU',
  },
]

export const SampleRestaurant: Restaurant[] = [
  {
    id: 1,
    gambar: 'Kosong',
    nama: 'KFC',
    deskripsi: 'Nimakti ayam KFC',
    rating: 4,
    review: 'KFC jelek',
  },
  {
    id: 2,
    gambar: 'Kosong',
    nama: 'McDonald',
    deskripsi: 'Nimakti ayam Mcdonald',
    rating: 3.8,
    review: 'Mcdonald jelek',
  },
]
