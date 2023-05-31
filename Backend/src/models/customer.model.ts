import db from "../config/db.config";

class Customer {
  async getCustomers() {
    const query = "SELECT * FROM customers";
    const res = await db.query(query);

    if (res.rowCount < 1) {
      console.error(`[db] Customer table is empty!`);
      return;
    }
    return res.rows;
  }

  async getCustomerById(id: string) {
    const query = `SELECT * FROM customers WHERE id = ${id}`;

    const res = await db.query(query);

    if (res.rowCount < 1) {
      console.error(`[db] Customer with id ${id} not found!`);
      return;
    }
    console.log("[db] Customer found with id", id);
    return res.rows[0];
  }

  async createCustomer(customer: any) {
    const { username, email, password, balance } = customer;
    const DEFAULT_BALANCE: Number = balance || 0.0;

    const query = `INSERT INTO customers (username, email, password, balance) 
                  VALUES ('${username}', '${email}', 
                  '${password}', ${DEFAULT_BALANCE})
                  RETURNING *;`;

    try {
      const res = await db.query(query);
      // console.log(res.rows[0]);
      console.log("[db] Insertion successful", res.rows[0]);
      // If insertion is successful, return true
      return res.rows[0];
    } catch (err) {
      console.error("[db] Error inserting customer: ", err.message);
      // If insertion is not successful, return false
      return;
    }
  }

  async deleteCustomer(id: string) {
    const query = `DELETE FROM customers WHERE id = ${id} RETURNING *;`;
    try {
      const res = await db.query(query);
      console.log("[db] Deletion successful");
      return res.rows[0];
    } catch (err) {
      console.error("[db] Error deleting customer: ", err.message);
      return;
    }
  }

  async paginateCustomers(page: number, size: number) {
    const query = `SELECT * FROM customers 
                  LIMIT ${size} OFFSET ${size * (page - 1)};`;
    try {
      const res = await db.query(query);
      console.log("[db] Pagination successful", res.rows);
      return res.rows;
    } catch (err) {
      console.error("[db] Error paginating customers", err.message);
      return;
    }
  }
}

export default Customer;
