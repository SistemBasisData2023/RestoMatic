import {
  BuildResponse,
  LoginFormValue_Props,
  Order_JSON,
  Post_Review,
} from '@interfaces/index'

export async function GET_CUSTOMER(user_id: number): Promise<BuildResponse> {
  const res = await fetch(`http://localhost:4000/api/customers/${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Error at getting account data')
  }

  return await res.json()
}

export async function GET_CUSTOMERORDER(
  user_id: string | string[]
): Promise<BuildResponse> {
  const res = await fetch(
    `http://localhost:4000/api/orders?customerId=${user_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await res.json()
}

export async function PATCH_TOPUP(
  user_id: number,
  balance: any
): Promise<BuildResponse> {
  const res = await fetch(
    `http://localhost:4000/api/customers/${user_id}/topup?` +
      new URLSearchParams({
        amount: balance,
      }),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    throw new Error('Error at top up a balance')
  }
  return await res.json()
}

export async function GET_RESTAURANTS(): Promise<BuildResponse> {
  const res = await fetch('http://localhost:4000/api/restaurants')
  if (!res.ok) throw new Error('Could not fetch restaurant data')
  return await res.json()
}

export async function GET_RESTAURANTSBYID(
  id: string | string[]
): Promise<BuildResponse> {
  const res = await fetch(`http://localhost:4000/api/restaurants/${id}`)
  if (!res.ok) throw new Error('Could not fetch restaurant data')
  return await res.json()
}

export async function GET_MENURESTAURANT(
  restaurant_id: string | string[]
): Promise<BuildResponse> {
  const res = await fetch(
    `http://localhost:4000/api/menu-items?restaurantId=${restaurant_id}`
  )
  if (!res.ok) throw new Error('Could not fetch menu data')
  return await res.json()
}

export async function GET_RESTAURANTREVIEW(
  restaurant_id: string | string[]
): Promise<BuildResponse> {
  const res = await fetch(
    `http://localhost:4000/api/reviews/?restaurantId=${restaurant_id}`
  )
  return await res.json()
}

export async function POST_REVIEW(data: Post_Review): Promise<BuildResponse> {
  const res = await fetch(`http://localhost:4000/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Could not post review data')
  return await res.json()
}

export async function DELETE_REVIEW(id: number): Promise<BuildResponse> {
  const res = await fetch(`http://localhost:4000/api/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) throw new Error('Could not delete review data')
  return await res.json()
}

export async function POST_LOGINCUSTOMER(
  data: LoginFormValue_Props
): Promise<BuildResponse> {
  const res = await fetch('http://localhost:4000/api/customers/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Error at Logging in an account')
  }
  return res.json()
}

export async function POST_ORDER(data: Order_JSON): Promise<BuildResponse> {
  const res = await fetch(`http://localhost:4000/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Error at making a payment')
  }
  return await res.json()
}
