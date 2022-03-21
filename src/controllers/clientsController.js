import connection from "../db.js";

export async function setClients(req, res) {
  const { name, address, phone } = req.body;

  try {
    await connection.query(
      `
    INSERT INTO clients (name, address, phone)
    VALUES ($1, $2, $3)
    `,
      [name, address, phone]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getOrderPerClient(req, res) {
  const { id } = req.params;

  try {
    const result = await connection.query(
      `
      SELECT 
        orders.id AS "orderId",
        orders.quantity,
        orders."createdAt",
        orders."totalPrice",
        cakes.name AS "cakeName",
        flavours.name AS "flavour"
      FROM clients
        JOIN orders ON orders."clientId"=clients.id
        JOIN cakes ON cakes.id=orders."cakeId"
        JOIN flavours ON flavours.id=cakes."flavourId"
      WHERE clients.id=$1
    `,
      [id]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
