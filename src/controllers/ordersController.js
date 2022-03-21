import connection from "../db.js";

function mapOrdersArrayToObject(row) {
  const [
    clientId,
    clientName,
    clientAddress,
    clientPhone,
    cakeId,
    cakeName,
    cakePrice,
    cakeDescription,
    cakeImage,
    flavourName,
    createdAt,
    quantity,
    totalPrice,
  ] = row;

  return {
    client: {
      id: clientId,
      name: clientName,
      address: clientAddress,
      phone: clientPhone,
    },
    cake: {
      id: cakeId,
      name: cakeName,
      price: cakePrice,
      description: cakeDescription,
      image: cakeImage,
      flavour: flavourName,
    },
    createdAt,
    quantity,
    totalPrice,
  };
}

export async function setOrders(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const listClients = await connection.query(
      `
    SELECT * FROM clients WHERE id=$1`,
      [clientId]
    );
    if (listClients.rowCount === 0) {
      return res.status(404).send("Cliente não encontrado");
    }

    const listCakes = await connection.query(
      `
    SELECT * FROM cakes WHERE id=$1`,
      [cakeId]
    );
    if (listCakes.rowCount === 0) {
      return res.status(404).send("Bolo não encontrado");
    }

    await connection.query(
      `
    INSERT INTO 
      orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
    VALUES ($1, $2, $3, NOW(), $4)
    `,
      [clientId, cakeId, quantity, totalPrice]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getOrders(req, res) {
  const { date } = req.query;

  try {
    const conditions = [];
    const params = [];
    let where = "";

    const { rowCount: existingOrder } = await connection.query(
      `
      SELECT "createdAt" FROM orders WHERE "createdAt"=$1
    `,
      [date]
    );
    if (date && !existingOrder) {
      return res.status(404).send([]);
    }

    if (date) {
      params.push(date);
      conditions.push(`orders."createdAt"=$${params.length}`);
    }

    if (params.length > 0) {
      where += `WHERE ${conditions.join("")}`;
    }

    const result = await connection.query(
      {
        text: `
        SELECT 
          clients.*,
          cakes.id, cakes.name, cakes.price, cakes.description, cakes.image,
          flavours.name AS flavourName,
          orders."createdAt", orders.quantity, orders."totalPrice"
        FROM orders
          JOIN clients ON clients.id=orders."clientId"
          JOIN cakes ON cakes.id=orders."cakeId"
          JOIN flavours ON flavours.id=cakes."flavourId"
        ${where}
      `,
        rowMode: "array",
      },
      params
    );

    res.status(200).send(result.rows.map(mapOrdersArrayToObject));
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function getOrdersById(req, res) {
  const { id } = req.params;
  console.log(id);
  console.log(parseInt(id));

  if (!parseInt(id)) {
    return res.sendStatus(400);
  }

  try {
    const result = await connection.query(
      {
        text: `
        SELECT 
          clients.*,
          cakes.id, cakes.name, cakes.price, cakes.description, cakes.image,
          flavours.name AS flavourName,
          orders."createdAt", orders.quantity, orders."totalPrice"
        FROM orders
          JOIN clients ON clients.id=orders."clientId"
          JOIN cakes ON cakes.id=orders."cakeId"
          JOIN flavours ON flavours.id=cakes."flavourId"
        WHERE orders.id=$1`,
        rowMode: "array",
      },
      [id]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(result.rows.map(mapOrdersArrayToObject));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
