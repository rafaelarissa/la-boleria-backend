import connection from "../db.js";

export async function setOrders(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const listClients = await connection.query(`
    SELECT * FROM clients WHERE id=$1`, [clientId]);
    if(listClients.rowCount === 0) {
      return res.status(404).send('Cliente não encontrado');
    }

    const listCakes = await connection.query(`
    SELECT * FROM cakes WHERE id=$1`, [cakeId]);
    if(listCakes.rowCount === 0) {
      return res.status(404).send('Bolo não encontrado');
    }

    await connection.query(`
    INSERT INTO 
      orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
    VALUES ($1, $2, $3, $4, $5)
    `, [clientId, cakeId, quantity, new Date(), totalPrice]);
    
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)    
  }
}