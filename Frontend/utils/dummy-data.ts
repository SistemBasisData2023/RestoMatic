import {
  Restaurant_Props,
  Customer_Props,
  Menu_Props,
  MenuType,
  Order_Item,
  Full_Order_Props,
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
    image:
      'https://w7.pngwing.com/pngs/1024/912/png-transparent-colonel-sanders-kfc-fried-chicken-logo-restaurant-fried-chicken-fast-food-restaurant-logo-fictional-character.png',
    name: 'KFC',
    description: 'Nimakti ayam KFC',
    average_rating: 4,
  },
  {
    id: 2,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/1200px-McDonald%27s_logo.svg.png',
    name: 'McDonald',
    description: 'Nimakti ayam Mcdonald',
    average_rating: 3.5,
  },
  {
    id: 3,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png',
    name: 'Burger King',
    description: 'Nimakti ayam Burger King',
    average_rating: 2.3,
  },
]

export const SampleMenu: Menu_Props[] = [
  {
    id: 1,
    restaurant_id: 1,
    type: MenuType.Makanan,
    picture:
      'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1602859167/pl8hnpklomexkb2gppkl.jpg',
    name: 'Ayam Krispy',
    description: 'Ayam yang enak',
    cost: 30000,
    rating: 4.2,
  },
  {
    id: 2,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://files.kfcku.com/uploads/media/dummy/food/kfc-web_wingers_l.png',
    name: 'Winger',
    description: 'Ayam Winger',
    cost: 25000,
    rating: 3.3,
  },
  {
    id: 3,
    restaurant_id: 1,
    menu_type: MenuType.Minuman,
    picture:
      'https://files.kfcku.com/uploads/media/food-menu/drinks/large/kfc-web_mocha-float_l_1.png',
    name: 'Mocha Float',
    description: 'Minuman coklat yang segar',
    cost: 23000,
    rating: 3.8,
  },
  {
    id: 4,
    restaurant_id: 2,
    menu_type: MenuType.Makanan,
    picture:
      'https://www.mcdelivery.co.id/id/static/1685574185379/assets/62/products/110000.png?',
    name: 'Chicken Burger',
    description: 'Burger',
    cost: 19500,
    rating: 3.2,
  },
  {
    id: 5,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://files.kfcku.com/uploads/media/food-menu/praktis/large/kfc-web_twisty_l_1.png',
    name: 'TWISTY',
    description: 'TWISTY',
    cost: 27000,
    rating: 3.8,
  },
  {
    id: 6,
    restaurant_id: 1,
    menu_type: MenuType.Makanan,
    picture:
      'https://files.kfcku.com/uploads/media/food-menu/spesial/kfc-web_9pcbucket-_l.png',
    name: '9 PCS BUCKET',
    description: '9 PCS BUCKET',
    cost: 70000,
    rating: 3.8,
  },
]

export const SampleFullOrder: Full_Order_Props[] = [
  {
    id: 1,
    customer_id: 1,
    restaurant_id: 1,
    total_cost: 78000,
  },
]

export const SampleOrderItem: Order_Item[] = [
  {
    id: 1,
    menu_id: 1,
    order_id: 1,
    quantity: 3,
  },
]
