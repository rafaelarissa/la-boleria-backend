import connection from "../db.js";

export async function setOrders(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    
    await connection.query(`
    INSERT INTO clients ("clientId", "cakeId", quantity, "totalPrice")
    VALUES ($1, $2, $3, $4)
    `, [clientId, cakeId, quantity, totalPrice]);
    
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)    
  }
}