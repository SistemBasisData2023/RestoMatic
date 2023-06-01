import {
  Restaurant_Props,
  Customer_Props,
  Menu_Props,
  MenuType,
} from '@interfaces/index'

export const samplePelanggan: Customer_Props[] = [
  {
    id: 1,
    email: 'seno@gmail.com',
    password: '123',
    balance: 150,
    username: 'UwU',
  },
]

export const SampleRestaurant: Restaurant_Props[] = [
  {
    id: 1,
    picture:
      'https://w7.pngwing.com/pngs/1024/912/png-transparent-colonel-sanders-kfc-fried-chicken-logo-restaurant-fried-chicken-fast-food-restaurant-logo-fictional-character.png',
    name: 'KFC',
    description: 'Nimakti ayam KFC',
    rating: 4,
    review: 'KFC jelek',
  },
  {
    id: 2,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/1200px-McDonald%27s_logo.svg.png',
    name: 'McDonald',
    description: 'Nimakti ayam Mcdonald',
    rating: 3.5,
    review: 'Mcdonald jelek',
  },
  {
    id: 3,
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png',
    name: 'Burger King',
    description: 'Nimakti ayam Burger King',
    rating: 2.3,
    review: 'Burger King jelek',
  },
]

export const SampleMenu: Menu_Props[] = [
  {
    id: 1,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602859167/pl8hnpklomexkb2gppkl.jpg',
    name: 'Ayam Krispy',
    description: 'Ayam yang enak',
    cost: 30,
    rating: 3,
  },
  {
    id: 1,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602859167/pl8hnpklomexkb2gppkl.jpg',
    name: 'Ayam Krispy',
    description: 'Ayam yang enak',
    cost: 30,
    rating: 3,
  },
  {
    id: 1,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602859167/pl8hnpklomexkb2gppkl.jpg',
    name: 'Ayam Krispy',
    description: 'Ayam yang enak',
    cost: 30,
    rating: 3,
  },
  {
    id: 1,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602859167/pl8hnpklomexkb2gppkl.jpg',
    name: 'Ayam Krispy',
    description: 'Ayam yang enak',
    cost: 30,
    rating: 3,
  },
  {
    id: 1,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602859167/pl8hnpklomexkb2gppkl.jpg',
    name: 'Ayam Krispy',
    description: 'Ayam yang enak',
    cost: 30,
    rating: 3,
  },
]
