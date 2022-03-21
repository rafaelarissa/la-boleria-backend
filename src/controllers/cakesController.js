import connection from "../db.js";

export async function setCakes(req, res) {
  const { name, price, description, image, flavourId } = req.body;

  try {
    const listCakes = await connection.query(
      `
    SELECT * FROM cakes
    WHERE name=$1`,
      [name]
    );
    if (listCakes.rowCount > 0) {
      return res.status(409).send("Nome de bolo já cadastrado!");
    }

    const listFlavours = await connection.query(
      `
    SELECT * FROM flavours
    WHERE id=$1`,
      [flavourId]
    );
    if (listFlavours.rowCount === 0) {
      return res.status(404).send("Sabor não encontrado");
    }

    await connection.query(
      `
    INSERT INTO 
      cakes (name, price, description, image, "flavourId")
    VALUES ($1, $2, $3, $4, $5)
    `,
      [name, price, description, image, flavourId]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
