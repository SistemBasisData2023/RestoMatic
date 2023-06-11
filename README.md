<div align="center">
  <h1 align="center">Welcome to RestoMatic</h1>
</div>

RestoMatic is a user-friendly web platform designed to simplify and streamline the process of ordering food and drinks from various restaurants. The platform offers users a convenient way to navigate through a wide range of restaurants, each with its own unique menu. Additionally, users can add funds to their balance to make payments and share their experiences by leaving ratings and reviews for specific restaurants.

![RestoLogo](https://raw.githubusercontent.com/SistemBasisData2023/RestoMatic/main/Assets/logo-new.png)

## Contributors

Group Q17:

- [Althaf Nafi Anwar](https://www.github.com/althafnafi) - 2106634881
- [Seno Pamungkas Rahman](https://www.github.com/cattyman919) - 2106731586
- [Zalfy Putra Rezky](https://www.github.com/zalfyputra) - 2106731453

RestoMatic is the final project for the 4th semester of the Database Systems + Lab in Undergraduate of Computer Engineering study program, Department of Electrical Engineering, Faculty of Engineering, Universitas Indonesia.

## Features

#### `Account`

Provides customers with the convenience of registering or logging in, allowing them to easily navigate menus, view ratings, and make informed choices. Additionally, RestoMatic offers a balance display and top-up feature, enabling customers to view their current balance and add funds as needed to make payment.

#### `Restaurant`

This is the home page. It offers an intuitive and user-friendly restaurant exploration feature, allowing customers to effortlessly browse through a wide range of restaurant options. Furthermore, it provides detailed information for each restaurant, including enticing descriptions, official logo, restaurant menus, customer ratings, and reviews.

#### `Filter`

Allow customers to find menus based on ratings, ensuring they can discover the most highly regarded dishes and drinks. The platform will display a curated selection of menus that meet the specified rating criteria, making it easier for customers to explore and choose from the best-rated options available.

#### `Menu`

Each food or beverage have its own individual page and is presented with its enticing name, captivating image, and mouthwatering description. This comprehensive display allows customers to get a complete overview of the item, making it easier to make informed choices based on their preferences and the experiences of other customers.

#### `Order`

After customers select their desired items, RestoMatic automatically adds each item to the order. The order page provides a clear and concise overview, displaying the names of the selected items, along with their respective quantities and total prices. Additionally, RestoMatic's order page also showcases the customer's balance, providing real-time visibility into their available funds.

#### `Payment`

Before finalizing the order, RestoMatic performs a thorough check to verify whether the customer's balance is adequate for payment. This error checking mechanism prevents customers from placing orders without having sufficient funds, saving them from potential payment issues or cancellations.

#### `Topup`

Customers have the flexibility to add funds to their account balance directly within the platform. This feature allows them to conveniently maintain their balance and have sufficient funds for placing orders.

#### `Ratings and Reviews`

Customers can easily rate and review the items they have ordered, sharing their experiences, insights, and opinions on specific menu items.

## Frameworks

#### Frontend

- [Next.js](https://nextjs.org/)
- [Tailwind.css](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

#### Backend

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)

## Documentation

See API documentations that include endpoints for retrieving and inserting data into the database and its examples.

[![Run In Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/22652839/2s93sc5sxd)

## Tables

The following are tables that is used in RestoMatic's database.

### 1. `Customers`

This table is used to store the data of the user on the website.

```
1. id
2. username
3. password
4. email
5. balance
```

### 2. `Menu Items`

This table stores information about the available items such as foods, beverages, and desserts.

```
1. id
2. restaurant_id
3. image
4. type
5. price
6. name
7. description
```

### 3. `Restaurants`

This table is used to store information about the restaurants.

```
1. id
2. image
3. name
4. description
```

### 4. `Orders`

This table tracks orders that have been placed by customers.

```
1. id
2. customer_id
3. address
4. restaurant_id
```

### 5. `Reviews`

This table is designed to store customer ratings for specific menus.

```
1. id
2. customer_id
3. restaurant_id
4. comment
5. rating
6. created_at
```

### 6. `Order Menu Items`

This table is used to store each menu selected and its quantities.

```
1. id
2. order_id
3. item_id
4. quantity
```

## Installation

#### Frontend

- Run yarn install to install all dependencies
  ```
  yarn install
  ```
- Run with
  ```
  yarn dev
  ```

#### Backend

- Run npm install to install all dependencies
  ```
  npm install
  ```
- Run with
  ```
  nodemon exec
  ```

## Diagrams

#### Flowchart

<details>
  <summary>Click Here</summary>
  
![RestoMatic Flowchart](https://github.com/SistemBasisData2023/RestoMatic/blob/main/Assets/flowchart-1.jpg)

</details>

#### UML Diagram

<details>
  <summary>Click Here</summary>
  
![RestoMatic Flowchart](https://github.com/SistemBasisData2023/RestoMatic/blob/main/Assets/DB_UML_Diagram.png)

</details>

#### Entity Relationship Diagram

<details>
  <summary>Click Here</summary>

![RestoMatic Flowchart](https://github.com/SistemBasisData2023/RestoMatic/blob/main/Assets/ER_Diagram.png)

</details>
