import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ["users", "categories", "items"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [Timur, Asyl, Kadyr, Amir] = await User.create(
    {
      username: "timur",
      password: "123",
      confirmPassword: "123",
      displayName: "Тимур",
      phoneNumber: 700122345,
      token: crypto.randomUUID(),
    },
    {
      username: "asyl",
      password: "123",
      confirmPassword: "123",
      displayName: "Асыл",
      phoneNumber: 700122345,
      token: crypto.randomUUID(),
    },
    {
      username: "kadyr",
      password: "123",
      confirmPassword: "123",
      displayName: "Кадыр",
      phoneNumber: 700122345,
      token: crypto.randomUUID(),
    },
    {
      username: "amir",
      password: "123",
      confirmPassword: "123",
      displayName: "Амир",
      phoneNumber: 700122345,
      token: crypto.randomUUID(),
    }
  );

  const [fruits, vegetables, clothes, food] = await Category.create(
    { title: "Фрукты" },
    { title: "Овощи" },
    { title: "Одежда" },
    { title: "Еда" }
  );

  await Item.create(
    {
      user: Timur,
      title: "Яблоки",
      description: "Всем привет я продаю иссыккульские яблоки пишите",
      category: fruits,
      image: "fixtures/apples.jpg",
      price: 300,
    },
    {
      user: Asyl,
      title: "Картошка",
      description: "Всем привет я продаю иссыккульскую картошку пишите",
      category: vegetables,
      image: "fixtures/potato.jpg",
      price: 50,
    },
    {
      user: Kadyr,
      title: "Футболка",
      description: "Всем привет я продаю иссыккульскую футболку пишите",
      category: clothes,
      image: "fixtures/tshirt.webp",
      price: 1000,
    },
    {
      user: Amir,
      title: "Бургер ",
      description: "Всем привет я продаю иссыккульский бургер пишите",
      category: food,
      image: "fixtures/burger.jpg",
      price: 150,
    }
  );

  await db.close();
};

void run();
