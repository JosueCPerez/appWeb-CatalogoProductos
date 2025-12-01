import { Model } from 'mongoose';
import { Catalog } from '../catalogs/catalog.schema';

export async function seedCatalogs(catalogModel: Model<Catalog>) {

  const count = await catalogModel.countDocuments();
  if (count > 0) return;  // no volver a insertar

  await catalogModel.insertMany([
    { codigo: 1, name: "Tecnologia", description: "Laptops y accesorios" },
    { codigo: 2, name: "Gamer", description: "Equipo gamer RGB" },
    { codigo: 3, name: "Ropa", description: "Prendas varias" }
  ]);


  console.log("- catalogos base creados");
}

