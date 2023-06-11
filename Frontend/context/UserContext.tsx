import {
  Customer_Props,
  Full_Order_Props,
  Order_Item,
  Restaurant_Props,
} from '@interfaces/index'
import { createContext, useContext, ReactNode, useState } from 'react'

type userContextType = {
  user: Customer_Props
  currentRestaurant: Restaurant_Props
  currentOrderItem: Order_Item[]
  login: (userData: Customer_Props) => void
  logout: () => void
  ChangeCurrentRestaurant: (restaurant: Restaurant_Props) => void
  IncrementQuantity: (id: number) => void
  DecrementQuantity: (id: number) => void
  AddCurrentItemOrder: (data: Order_Item) => void
}

const userContextDefaultValues: userContextType = {
  user: null,
  currentRestaurant: {
    id: -1,
    description: 'null',
    image: null,
    name: 'null',
    average_rating: null,
  },
  currentOrderItem: [],
  login: () => {},
  logout: () => {},
  ChangeCurrentRestaurant: () => {},
  IncrementQuantity: () => {},
  DecrementQuantity: () => {},
  AddCurrentItemOrder: () => {},
}

const UserContext = createContext<userContextType>(userContextDefaultValues)

export function useUser() {
  return useContext(UserContext)
}

type Props = {
  children: ReactNode
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<Customer_Props>(null)
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant_Props>({
    id: -1,
    description: 'null',
    image: null,
    name: 'null',
    average_rating: null,
  })
  const [currentOrderItem, setCurrentOrderItem] = useState<Order_Item[]>([])

  const login = (userData: Customer_Props) => {
    setUser(userData)
  }
  const logout = () => {
    setUser(null)
    setCurrentOrderItem([])
    setCurrentRestaurant({
      id: -1,
      description: 'null',
      image: null,
      name: 'null',
      average_rating: null,
    })
  }

  const ChangeCurrentRestaurant = (restaurant: Restaurant_Props) => {
    setCurrentRestaurant(restaurant)
  }

  const IncrementQuantity = (id: number) => {
    setCurrentOrderItem((value) => {
      const quantity = value.find((d) => {
        return d.id === id
      }).quantity
      if (quantity === undefined) return

      value.find((d) => {
        return d.id == id
      }).quantity++

      return [...value]
    })
  }
  const DecrementQuantity = (id: number) => {
    setCurrentOrderItem((value) => {
      const quantity = value.find((d) => {
        return d.id === id
      }).quantity

      if (quantity === undefined) return

      if (quantity == 1) {
        const newData = value.filter((d) => {
          return d.id !== id
        })

        return [...newData]
      } else
        value.find((d) => {
          return d.id == id
        }).quantity--

      return [...value]
    })
  }

  const AddCurrentItemOrder = (data: Order_Item) => {
    const dataAlreadyExist = currentOrderItem.find((order) => {
      return order.menu_id === data.menu_id
    })

    if (dataAlreadyExist) {
      const newData = currentOrderItem
      const indexData = newData.findIndex((order) => {
        return order.menu_id === data.menu_id
      })
      newData[indexData].quantity += data.quantity

      setCurrentOrderItem(newData)
      return
    }
    setCurrentOrderItem((value) => {
      return [...value, data]
    })
  }

  const value = {
    user,
    currentOrderItem,
    currentRestaurant,
    login,
    logout,
    ChangeCurrentRestaurant,
    IncrementQuantity,
    DecrementQuantity,
    AddCurrentItemOrder,
  }
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  )
}
