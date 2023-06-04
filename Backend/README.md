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
            "id": 1,
            "image": "image_rest1.jpg",
            "name": "The Burger Joint",
            "description": "Best burgers in town"
        },
        {
            "id": 2,
            "image": "image_rest2.jpg",
            "name": "Pizza Paradise",
            "description": "Authentic Italian pizza"
        },
        {
            "id": 3,
            "image": "image_rest3.jpg",
            "name": "Cafe Delight",
            "description": "Cozy cafe with great coffee"
        },
        {
            "id": 4,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 7,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 8,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 9,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 10,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 11,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 12,
            "image": "/images/default-restaurant.png",
            "name": "McDonalds",
            "description": "We serve amazing fries!"
        },
        {
            "id": 13,
            "image": "/images/default-restaurant.png",
            "name": "Burger King",
            "description": "Best burger in town!"
        }
    ]
}
```

## Get all menu items of a restaurant

```
@GET
http://localhost:4000/api/menu-items
params: customerId
```

```

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
