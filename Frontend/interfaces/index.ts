export type Customer_Props = {
  id: number // Primary Key (PK)
  username: string
  password: string
  email: string
  balance: number
}

export type Restaurant_Props = {
  id: number // Primary Key (PK)
  picture: string
  name: string
  description: string
  rating?: number
  review?: string
}

export type Menu_Props = {
  id: number // Primary Key (PK)
  restaurant_id: number // Foreign Key (FK)
  picture: string
  name: string
  menu_type: MenuType
  description: string
  rating?: number
  cost: number
}

export enum MenuType {
  Makanan,
  Minuman,
}

export type Order_Props = {
  id: number // Primary Key (PK)
  customer_id: number // Foreign Key (FK)
  restaurant_id: number[] // Foreign Key (FK)
  order: Order_Item[]
  total_cost: number
}

export type Order_Item = {
  id: number // Primary Key (PK)
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
