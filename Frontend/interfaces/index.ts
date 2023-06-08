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
