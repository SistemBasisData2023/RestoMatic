import db from "../config/db.config";

class Customer {
  async getCustomers() {
    const query = "SELECT * FROM customer";
    const res = await db.query(query);

    if (res.rowCount < 1) {
      console.error(`[db] Customer table is empty!`);
      return;
    }
    return res.rows;
  }

  async getCustomerById(id: string) {
    const query = `SELECT * FROM customer WHERE id = ${id}`;

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

    const query = `INSERT INTO customer (username, email, password, balance) 
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
}

export default Customer;
