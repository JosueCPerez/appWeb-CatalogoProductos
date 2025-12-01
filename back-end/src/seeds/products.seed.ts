import { Model } from 'mongoose';
import { Product } from '../products/product.schema';
import { Catalog } from '../catalogs/catalog.schema';

export async function seedProducts(productModel: Model<Product>, catalogModel: Model<Catalog>) {

  const exists = await productModel.countDocuments();
  if(exists > 0) return;

  const cats = await catalogModel.find();
  const map = Object.fromEntries( cats.map(c => [c.name, c._id]) );

  const data = [
    { codigo: 1, name:"Laptop Lenovo Ryzen 7", price:6500, stock:10, description:"16GB / 512SSD", image:"https://ofixmxb2b.vtexassets.com/arquivos/ids/225070/LAPTOP-LENOVO-IDEAPAD-1-15ALC7-156--FHD--AMD-RYZEN-7-5700U-16GB-RAM-512GB-SSD-WIN11HOME.jpg?v=638641334540700000", catalogIds:[map.Tecnologia] },
    { codigo: 2, name:"Teclado Mecanico RGB", price:299, stock:50,  description:"Switch Red",     image:"https://m.media-amazon.com/images/I/71cngLX2xuL._AC_SL1500_.jpg", catalogIds:[map.Tecnologia,map.Gaming] },

    { codigo: 3, name:"Headset Gamer",        price:250, stock:40,  description:"Sonido surround", image:"https://www.radioshackla.com/media/catalog/product/3/3/3304407.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700", catalogIds:[map.Gaming] },
    { codigo: 4, name:"Mouse HyperX Pulsefire",price:175, stock:60, description:"Sensor 12K",      image:"https://cdn.pacifiko.com/image/cache/catalog/p/Y2NjMjM1OG-500x500.jpg", catalogIds:[map.Gaming] },

    { codigo: 5, name:"Camisa Oversize",      price:110, stock:30, description:"Tallas S-XL",      image:"https://oaxis-cloud.s3.us-east-2.amazonaws.com/images/2024/06/07/medium/kOKlEDbTFUd6Q1paNs38.jpg", catalogIds:[map.Ropa] },
    { codigo: 6, name:"Sudadera Unisex",      price:190, stock:25, description:"100% algodón",     image:"https://tiendaoficial.bacardi.com/cdn/shop/files/Sudadera_Full-Signature_frente.png?v=1728954570", catalogIds:[map.Ropa] }
  ];

  await productModel.insertMany(data);

  console.log("- productos demo creados");
}

