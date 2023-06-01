<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Welcome to RestoMatic</h1>
  <p align="center">RestoMatic is a user-friendly web platform designed to streamline the process of ordering food and drinks from a restaurant.</p>
</div>

## Contributors
This is a final Database Management System project made by Group Q17:
- [Althaf Nafi Anwar](https://www.github.com/althafnafi) - 2106634881
- [Seno Pamungkas Rahman](https://www.github.com/cattyman919) - 2106731586
- [Zalfy Putra Rezky](https://www.github.com/zalfyputra) - 2106731453

## Features

#### ```Admin```

Provides customers with the convenience of registering or logging in, allowing them to easily navigate menus, view ratings, and make informed choices. Additionally, RestoMatic offers a balance display and top-up feature, enabling customers to view their current balance and add funds as needed to make payment.

#### ```Menus```

Offers an intuitive and user-friendly menu exploration feature, allowing customers to effortlessly browse through a wide range of food and beverage options. The menu section provides detailed information for each item, including enticing descriptions, appealing images, and customer ratings.

#### ```Filter```

Allow customers to find menus based on ratings, ensuring they can discover the most highly regarded dishes and drinks. The platform will display a curated selection of menus that meet the specified rating criteria, making it easier for customers to explore and choose from the best-rated options available.

#### ```Item```

Each food or beverage or dessert have its own individual page and is presented with its enticing name, captivating image, mouthwatering description, customer ratings, and helpful reviews. This comprehensive display allows customers to get a complete overview of the item, making it easier to make informed choices based on their preferences and the experiences of other customers.

#### ```Order```

After customers select their desired items, RestoMatic automatically adds each item to the order. The order page provides a clear and concise overview, displaying the names of the selected items, along with their respective quantities and total prices. Additionally, RestoMatic's order page also showcases the customer's balance, providing real-time visibility into their available funds.

#### ```Payment```
Before finalizing the order, RestoMatic performs a thorough check to verify whether the customer's balance is adequate for payment. This error checking mechanism prevents customers from placing orders without having sufficient funds, saving them from potential payment issues or cancellations.

#### ```Topup```
Customers have the flexibility to add funds to their account balance directly within the platform. This feature allows them to conveniently maintain their balance and have sufficient funds for placing orders.

#### ```Ratings and Reviews```
Customers can easily rate and review the items they have ordered, sharing their experiences, insights, and opinions on specific menu items.

## Frameworks

#### Frontend
- Next.js
- Tailwind.css
- Typescript

#### Backend
- PostgreSQL
- Node.js
- Express.js
- Typescript
- Libraries: alert, bcrypt, body-parser, jquery, nodemon, pg

## Tables
The following are tables that is used in RestoMatic's database.

### 1.  ```Pelanggan```

This table is used to store the data of the user on the website.
```
1. id
2. username
3. password
4. email
5. saldo
```

### 2.  ```Menu```

This table stores information about the available items such as foods, beverages, and desserts.
```
1. id
2. gambar
3. nama
4. deskripsi
5. rating
```
### 3.  ```Item```

This table is used to store information about a specific item.
```
1. id
2. gambar
3. nama
4. deskripsi
5. rating
6. review
```

### 4.  ```Order```

This table tracks orders that have been placed by customers.
```
1. id
2. pelanggan_id
3. menu_id
4. makanan_id[]
5. minuman_id[]
6. saldo_user
7. total_harga
```

### 5.  ```Rating```

This table is designed to store customer ratings for specific menus
```
1. id
2. user_id
3. menu_id
4. rating
```

## Flowchart
The flowchart provides a visual representation of the different stages involved in using RestoMatic, such as registration or login, menu exploration, item selection, order placement, balance management, and review submission. By following the flowchart, customers can seamlessly navigate through each stage and accomplish their desired tasks efficiently.
<details>
  <summary>Click Here</summary>

![RestoMatic Flowchart](https://github.com/SistemBasisData2023/RestoMatic/blob/main/Assets/flowchart-1.jpg)
