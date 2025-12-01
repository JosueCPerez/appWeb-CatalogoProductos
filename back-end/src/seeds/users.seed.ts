import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcrypt';

export async function seedUsers(userModel: Model<User>) {

  const exists = await userModel.findOne({ email: "admin@mail.com" });
  if (exists) return;   // no crear repetido

  const password = await bcrypt.hash("admin123",10);

  await userModel.create({
    name:"Administrador",
    userName:"admin",
    email:"admin@mail.com",
    password,
    role:"admin"
  });

  console.log("- usuario admin creado");
}

