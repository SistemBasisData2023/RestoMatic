# Cara Install Project

Pake npm buat install

```bash
npm install
```

# Cara Run

```bash
npm start
```

# API Examples

## Register

```
@POST
http://localhost:4000/api/customers/register
body:
username = senoseno
email = senoseno@gmail.com
password = Pass123

```

### Response

```
{
    "error": false,
    "message": "[db] Insertion to customers successful:",
    "data": {
        "id": 18,
        "username": "senoseno",
        "password": "$2b$10$LH4XEW88wZSzN4LzKPTi0ef6mAj9S437CltnVl68BnjgGC7.3Kzw2",
        "email": "senoseno@gmail.com",
        "balance": "0.00"
    }
}
```

## Login

```
@GET
http://localhost:4000/api/customers/login
body:
email = althafnafi@gmail.com
password = Pass123
```

### Response

```
{
    "error": false,
    "message": "Succesfully logged in",
    "data": {
        "login": true,
        "accountDetails": {
            "id": 10,
            "email": "althafnafi@gmail.com"
        }
    }
}
```

## Get data of customer

```
@POST
http://localhost:4000/api/customers/{customer_id}
```

```
{
    "error": false,
    "message": "",
    "data": {
        "id": 10,
        "username": "althafnafi",
        "password": "$2b$10$I2I.9yqFRsn8ubKNHG5D2.TZN.xSfGrHDt8BaP4M0cnA2jPWuNAOi",
        "email": "althafnafi@gmail.com",
        "balance": "0.00"
    }
}
```

## Topup balance by customer Id

```
@PATCH
http://localhost:4000/api/customers/{id}/topup/
params:
- amount
```

```
{
    "error": false,
    "message": "[db] customers topup successful",
    "data": {
        "id": 10,
        "username": "althafnafi",
        "password": "$2b$10$I2I.9yqFRsn8ubKNHG5D2.TZN.xSfGrHDt8BaP4M0cnA2jPWuNAOi",
        "email": "althafnafi@gmail.com",
        "balance": "42347.00",
        "topup": true
    }
}
```

## Get all available restaurants

```
@GET
http://localhost:4000/api/restaurants
```

```
{
    "error": false,
    "message": "",
    "data": [
        {
            "id": 4,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        },
        {
            "id": 10,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        },
        {
            "id": 13,
            "image": "/images/default-restaurant.png",
            "name": "Burger King",
            "description": "Best burger in town!",
            "average_rating": null
        },
        {
            "id": 2,
            "image": "image_rest2.jpg",
            "name": "Pizza Paradise",
            "description": "Authentic Italian pizza",
            "average_rating": null
        },
        {
            "id": 11,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        },
        {
            "id": 7,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        },
        {
            "id": 9,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        },
        {
            "id": 12,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        },
        {
            "id": 3,
            "image": "image_rest3.jpg",
            "name": "Cafe Delight",
            "description": "Cozy cafe with great coffee",
            "average_rating": null
        },
        {
            "id": 1,
            "image": "image_rest1.jpg",
            "name": "The Burger Joint",
            "description": "Best burgers in town",
            "average_rating": "4.25"
        },
        {
            "id": 8,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!",
            "average_rating": null
        }
    ]
}
```

## Get all menu items of a restaurant

```
@GET
http://localhost:4000/api/menu-items
params: restaurantId
```

```
{
    "error": false,
    "message": "menu_items with restaurant id: 1 found!",
    "data": [
        {
            "id": 6,
            "image": "image1.jpg",
            "type": "Food",
            "price": "12.99",
            "name": "Cheeseburger",
            "description": "Delicious cheeseburger",
            "restaurant_id": "1"
        },
        {
            "id": 8,
            "image": "image3.jpg",
            "type": "Food",
            "price": "15.99",
            "name": "Chicken Alfredo",
            "description": "Creamy pasta dish",
            "restaurant_id": "1"
        }
    ]
}
```

## Create a new order

```
@POST
http://localhost:4000/api/orders
raw body:
{
  "customer_id": "4",
  "restaurant_id": "1",
  "items": [
    {
      "menu_id": "7",
      "quantity": 3
    },
    {
      "menu_id": "8",
      "quantity": 4
    }
  ],
  "address": "321 Heolly St, Toronto, ON"
}
```

### Response

```
{
    "error": false,
    "message": "Order created successfully",
    "data": {
        "customer_id": 4,
        "restaurant_id": 1,
        "restaurant_name": "The Burger Joint",
        "created_at": "2023-06-03T22:29:34.520Z",
        "address": "321 Heolly St, Toronto, ON",
        "total_price": 93.93,
        "items": [
            {
                "menu_id": 7,
                "name": "Margherita Pizza",
                "quantity": 3,
                "price": 9.99,
                "type": "Food",
                "image": "image2.jpg",
                "description": "Classic pizza"
            },
            {
                "menu_id": 8,
                "name": "Chicken Alfredo",
                "quantity": 4,
                "price": 15.99,
                "type": "Food",
                "image": "image3.jpg",
                "description": "Creamy pasta dish"
            }
        ]
    }
}
```

## Show order history of a customer

```

@GET
http://localhost:4000/api/orders/
params: customerId

```

```
{
    "error": false,
    "message": "Query orders successful, orders found",
    "data": {
        "customer_id": 1,
        "total_orders": 3,
        "total_spent": 44.96,
        "orders": [
            {
                "restaurant_id": 1,
                "restaurant_name": "The Burger Joint",
                "created_at": "2023-05-30T03:30:00.000Z",
                "address": null,
                "total_price": 25.98,
                "items": [
                    {
                        "menu_id": 6,
                        "name": "Cheeseburger",
                        "quantity": 1,
                        "price": 12.99,
                        "type": "Food",
                        "image": "image1.jpg",
                        "description": "Delicious cheeseburger"
                    }
                ]
            },
            {
                "restaurant_id": 1,
                "restaurant_name": "The Burger Joint",
                "created_at": "2023-05-30T03:30:00.000Z",
                "address": null,
                "total_price": 15.99,
                "items": [
                    {
                        "menu_id": 8,
                        "name": "Chicken Alfredo",
                        "quantity": 1,
                        "price": 15.99,
                        "type": "Food",
                        "image": "image3.jpg",
                        "description": "Creamy pasta dish"
                    }
                ]
            },
            {
                "restaurant_id": 1,
                "restaurant_name": "The Burger Joint",
                "created_at": "2023-05-30T03:30:00.000Z",
                "address": null,
                "total_price": 2.99,
                "items": [
                    {
                        "menu_id": 9,
                        "name": "Coke",
                        "quantity": 1,
                        "price": 2.99,
                        "type": "Beverage",
                        "image": "image4.jpg",
                        "description": "Refreshing soft drink"
                    }
                ]
            }
        ]
    }
}
```

## Show order by ID

```
@GET
http://localhost:4000/api/orders/{order_id}
```

```
{
    "error": false,
    "message": "Query orders successful, order found",
    "data": {
        "customer_id": 9,
        "restaurant_id": 2,
        "restaurant_name": "Pizza Paradise",
        "created_at": "2023-05-30T03:30:00.000Z",
        "address": "123 Main St, Toronto, ON",
        "total_price": 41.97,
        "items": [
            {
                "menu_id": 6,
                "name": "Cheeseburger",
                "quantity": 2,
                "price": 12.99,
                "type": "Food",
                "image": "image1.jpg",
                "description": "Delicious cheeseburger"
            },
            {
                "menu_id": 8,
                "name": "Chicken Alfredo",
                "quantity": 1,
                "price": 15.99,
                "type": "Food",
                "image": "image3.jpg",
                "description": "Creamy pasta dish"
            }
        ]
    }
}
```

## Get all reviews

```
@GET
http://localhost:4000/api/reviews
```

### Response

```
{
    "error": false,
    "message": "",
    "data": [
        {
            "id": 3,
            "customer_id": "94",
            "restaurant_id": "20",
            "comment": "I had the best pepperoni pizzas here, it was Amazing! A have to try menu item from Dominos for sure",
            "rating": "4.7",
            "created_at": "2023-06-07T22:56:44.939Z"
        },
        {
            "id": 4,
            "customer_id": "94",
            "restaurant_id": "19",
            "comment": "The coffee was ok, donuts were nice though",
            "rating": "3.5",
            "created_at": "2023-06-07T22:58:59.466Z"
        }
    ]
}
```

## Create a new review:

```
@POST
http://localhost:4000/api/reviews
body:
- comment (text)
- rating (0.0 - 5.0)
- customer_id
- restaurant_id
```

### Response

```
{
    "error": false,
    "message": "",
    "data": [
        {
            "id": 3,
            "customer_id": "94",
            "restaurant_id": "20",
            "comment": "I had the best pepperoni pizzas here, it was Amazing! A have to try menu item from Dominos for sure",
            "rating": "4.7",
            "created_at": "2023-06-07T22:56:44.939Z"
        }
    ]
}
```
