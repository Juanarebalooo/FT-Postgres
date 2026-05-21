import { sequelize } from "./db";
import { Product } from "./db/product";
import express from "express";
import cors from "cors";
async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const PORT = process.env.PORT || 3000;
  await sequelize.sync({ alter: true });
  app.post("/products", async (req, res) => {
    const { price, title, available } = req.body;

    try {
      await Product.create({
        price: price,
        title: title,
        available: available,
      });
      res.json({ message: "Producto añadido" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al momento de añadir un producto: " + err });
    }
  });
  app.get("/products", async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al devolver los productos " + err });
    }
  });
  app.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (product === null) {
      res
        .status(400)
        .json({ message: "No existe un producto con la id que pediste" });
    } else {
      try {
        res.json(product);
      } catch (err) {
        res
          .status(400)
          .json({ message: "Error al devolver el producto " + err });
      }
    }
  });
  app.patch("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;
    try {
      await Product.update(updates, {
        where: {
          id: productId,
        },
      });
      res.json({ message: "Producto actualizado correctamente" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al intentar modificar un producto " + err });
    }
  });
  app.delete("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
      await Product.destroy({
        where: {
          id: productId,
        },
      });
      res.json({ message: "Producto eliminado correctamente" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al intentar eliminar un producto " + err });
    }
  });
  app.listen(PORT, () => {
    console.log("El server esta prendido");
  });
  // await sequelize.query('TRUNCATE TABLE "products" RESTART IDENTITY;');
}

main();
