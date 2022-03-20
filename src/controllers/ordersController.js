import connection from "../db.js";

export async function setOrders(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    await connection.query(`
    INSERT INTO orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
    VALUES ($1, $2, $3, $4, $5)
    `, [clientId, cakeId, quantity, new Date(), totalPrice]);
    
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)    
  }
}