import db from "../dbconfig/dbconnector";

class TodosController {
  public async get(req, res) {
    try {
      const client = await db.connect();

      const sql = "SELECT * FROM todos";
      const { rows } = await client.query(sql);
      const todos = rows;

      client.release();

      res.send(todos);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default TodosController;
