import db from "../config/db.config";

class Customer {
  async getCustomers() {
    const query = "SELECT * FROM customer";
    const res = await db.query(query);
    return res.rows;
  }
}

export default Customer;
