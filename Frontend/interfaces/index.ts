export type Customer_Props = {
  id: number // Primary Key (PK)
  username: string
  email: string
  balance: number
}

export type Restaurant_Props = {
  id: number // Primary Key (PK)
  image: string
  name: string
  description: string
  average_rating?: number
}

export type Menu_Props = {
  id: number // Primary Key (PK)
  restaurant_id: number // Foreign Key (FK)
  image: string
  name: string
  type: MenuType
  description: string
  price: number
}

export enum MenuType {
  Food,
  Beverage,
}

export type Full_Order_Props = {
  id: number // Primary Key (PK)
  customer_id: number // Foreign Key (FK)
  restaurant_id: number // Foreign Key (FK)
  total_cost: number
}

export type Order_Item = {
  id: number // Primary Key (PK)
  order_id: number // Foreign Key (FK)
  menu_id: number // Foreign Key (FK)
  price: number
  quantity: number
}

export type LoginFormValue_Props = {
  email: string
  password: string
}

export type SignUpFormValue_Props = {
  username: string
  email: string
  password: string
}

export type BuildResponse = {
  error: boolean | null | undefined
  message: string
  data: any
}

export type Order_JSON = {
  customer_id: number
  restaurant_id: number
  items: MenuOrder_JSON[]
  address: string
}
export type MenuOrder_JSON = {
  menu_id: number
  quantity: number
}

export type OrderHistory_JSON = {
  customer_id: number
  total_orders: number
  total_spent: number
  orders: Orders_Props[]
}

export type Orders_Props = {
  restaurant_id: number
  restaurant_name: string
  created_at: string
  address: string
  total_price: number
  items: Items_Props[]
}

export type Items_Props = {
  menu_id: number
  name: string
  quantity: number
  price: number
  type: string
  image: string
  description: string
}

export type Reviews_Props = {
  id: number
  customer_id: number
  restaurant_id: number
  comment: string
  rating: number
  created_at: Date
}
