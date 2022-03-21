import connection from "../db.js";

export async function setFlavours(req, res) {
  try {
    const listFlavours = await connection.query(
      `
    SELECT * FROM flavours
    WHERE name=$1`,
      [req.body.name]
    );
    if (listFlavours.rowCount > 0) {
      return res.status(409).send("Sabor já cadastrado!");
    }

    await connection.query(
      `
    INSERT INTO
      flavours (name)
    VALUES ($1)`,
      [req.body.name]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
