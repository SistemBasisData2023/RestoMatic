import BaseModel from "./base.model";
import {
  buildCustomerOrderData,
  buildOrderData,
  buildResponse,
} from "../utils/utils";
import { exec } from "child_process";

const TABLE_NAME = "orders";

class Order extends BaseModel {
  constructor() {
    super(TABLE_NAME);
  }
  /*
  const orderData = {
    customer_id: '4',
    restaurant_id: '1',
    items: [
      {
        menu_id: '7',
        quantity: 3
      },
      {
        menu_id: '8',
        quantity: 4
      },
    ],
    address: '321 Heolly St, Toronto, ON'
  }; */
  public async create(order: any) {
    const { customer_id, restaurant_id, items, address } = order;
    console.log(customer_id, restaurant_id, items, address);
    console.log(order);
    if (!customer_id || !restaurant_id || !address || items.length < 1) {
      return buildResponse(
        null,
        `[db] Insertion to ${this.tableName} failed: Missing customer_id or restaurant_id or items or address`
      );
    }
    const query = `
        WITH new_order AS (
          INSERT INTO orders (customer_id, restaurant_id, address)
          VALUES
            (${customer_id}, ${restaurant_id}, '${address}')
          RETURNING *
        )
        INSERT INTO order_menu_items (order_id, item_id, quantity)
        SELECT id, (items->>'menu_id')::int, (items->>'quantity')::int
        FROM new_order, jsonb_array_elements('${JSON.stringify(
          items
        )}'::jsonb) AS items
        RETURNING *;
      `;
    try {
      const res = await this.db.query(query);
      console.log(
        `[db] Insertion to ${this.tableName} successful`,
        res.rows[0]
      );

      // If insertion is successful, return true
      return buildResponse(
        { order_id: res.rows[0].order_id },
        `The order is successfully placed. Your order id is ${res.rows[0].id}`
      );
    } catch (err) {
      console.error(`[db] Error inserting to ${this.tableName}:`, err.message);
      // If insertion is not successful, return false
      return buildResponse(null, err.message);
    }
  }

  // Override the base class method
  public async getById(id: number): Promise<any> {
    const query = `
        SELECT
          o.customer_id,
          o.restaurant_id,
          r.name AS restaurant_name,
          r.image AS restaurant_image,
          o.created_at,
          o.address,
          mi.id AS menu_id,
          mi.name,
          om.quantity,
          mi.price,
          mi.type,
          mi.image,
          mi.description
        FROM
          orders AS o
          INNER JOIN order_menu_items AS om ON o.id = om.order_id
          INNER JOIN menu_items AS mi ON om.item_id = mi.id
          INNER JOIN restaurants AS r ON o.restaurant_id = r.id
        WHERE
          o.id = ${id};
      `;
    try {
      const res = await this.db.query(query);

      // If query is not successful, return false
      if (res.rows.length < 1) {
        console.error(`[db] Query ${this.tableName} failed: No such order`);
        return buildResponse(
          null,
          `Query ${this.tableName} failed: No such order`
        );
      }
      // If query is successful, return the result
      console.log(`[db] Query ${this.tableName} successful, order found`);

      // Build order object
      const foundOrder = buildOrderData(res.rows);

      return buildResponse(
        foundOrder,
        `Query ${this.tableName} successful, order found`
      );
    } catch (err) {
      console.error(`[db] Error querying ${this.tableName}:`, err.message);
      // If query is not successful, return false
      return buildResponse(null, err.message);
    }
  }

  public async getByCustomerId(customer_id: number): Promise<any> {
    const query = `
        SELECT
          o.customer_id,
          r.id AS restaurant_id,
          o.id AS order_id,
          r.name AS restaurant_name,
          r.image AS restaurant_image,
          o.created_at,
          o.address,
          SUM(mi.price * om.quantity) AS total_price,
          mi.id AS menu_id,
          mi.name,
          om.quantity,
          mi.price,
          mi.type,
          mi.image,
          mi.description
        FROM
          orders AS o
          INNER JOIN order_menu_items AS om ON o.id = om.order_id
          INNER JOIN menu_items AS mi ON om.item_id = mi.id
          INNER JOIN restaurants AS r ON o.restaurant_id = r.id
        WHERE
          o.customer_id = $1
        GROUP BY
          o.customer_id,
          r.id,
          o.id,
          r.name,
          r.image,
          o.created_at,
          o.address,
          mi.id,
          mi.name,
          om.quantity,
          mi.price,
          mi.type,
          mi.image,
          mi.description
        ORDER BY
          o.created_at DESC;
      `;
    try {
      const values = [customer_id];
      const res = await this.db.query(query, values);
      console.log(res.rows);
      // If query is not successful, return false
      if (res.rows.length < 1) {
        console.error(
          `[db] Query ${this.tableName} failed: No order for this customer`
        );
        return buildResponse(
          null,
          `Query ${this.tableName} failed: No order for this customer`
        );
      }

      // console.log(res.rows);
      const foundOrders = buildCustomerOrderData(customer_id, res.rows);
      console.log("[db] Query orders successful, orders found", foundOrders);
      return buildResponse(
        foundOrders,
        `Query ${this.tableName} successful, orders found`
      );
    } catch (err) {
      console.error(`[db] Error querying ${this.tableName}:`, err.message);
      // If query is not successful, return false
      return buildResponse(null, err.message);
    }
  }

  public async __validateBalance(order: any) {
    const { customer_id, restaurant_id, items, address } = order;
    if (!customer_id || !restaurant_id || !address || items.length < 1) {
      return buildResponse(
        null,
        `[db] Insertion to ${this.tableName} failed: Missing customer_id or restaurant_id or items or address`
      );
    }

    const query = `WITH order_data AS (
                  SELECT
                    jsonb_array_elements('${JSON.stringify(
                      items
                    )}'::jsonb) AS item,
                    ${customer_id}::bigint AS customer_id,
                    ${restaurant_id}::bigint AS restaurant_id
                  )
                  SELECT
                    sum(items.price * (order_data.item->>'quantity')::int) AS total_price,
                    balance AS user_balance
                  FROM
                    order_data
                    JOIN menu_items AS items ON (order_data.item->>'menu_id')::int = items.id
                    JOIN customers ON customers.id = order_data.customer_id
                  WHERE
                    items.restaurant_id = order_data.restaurant_id
                  GROUP BY
                    customers.balance;`;
    try {
      const res = await this.db.query(query);
      if (res.rows.length < 1) {
        console.error(`[db] Query ${this.tableName} failed: No such order`);
        return -1;
      }

      const total_price = res.rows[0].total_price;
      const user_balance = res.rows[0].user_balance;

      console.log(
        `[db] Query ${this.tableName} successful, order found and total price is ${total_price}`
      );
      return { total_price, user_balance };
    } catch (err) {
      console.error(`[db] Error querying ${this.tableName}:`, err.message);
      return -1;
    }
  }
}

export default Order;
