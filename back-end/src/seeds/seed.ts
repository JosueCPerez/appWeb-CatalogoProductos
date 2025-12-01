import "dotenv/config";  // ← NECESARIO PARA CARGAR EL .env

import { connect, model } from "mongoose";
import { seedUsers } from "./users.seed";
import { seedCatalogs } from "./catalogs.seed";
import { seedProducts } from "./products.seed";

import { UserSchema } from "../users/user.schema";
import { CatalogSchema } from "../catalogs/catalog.schema";
import { ProductSchema } from "../products/product.schema";

(async () => {
  console.log("Intentando conectar a", process.env.MONGO_URI);

  await connect(process.env.MONGO_URI as string);

  const UserModel = model("User", UserSchema);
  const CatalogModel = model("Catalog", CatalogSchema);
  const ProductModel = model("Product", ProductSchema);

  await seedUsers(UserModel);
  await seedCatalogs(CatalogModel);
  await seedProducts(ProductModel, CatalogModel);

  console.log("✔ SEED COMPLETADO");
  process.exit(0);
})();
