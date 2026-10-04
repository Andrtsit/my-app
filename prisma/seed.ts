import "dotenv/config";
import { prisma } from "../lib/prisma";

const titles = [
  "Classic Hoodie", "Canvas Backpack", "Wireless Earbuds", "Desk Lamp",
  "Water Bottle", "Running Shoes", "Leather Wallet", "Mechanical Keyboard",
  "Coffee Mug", "Sunglasses", "Yoga Mat", "Notebook Set",
  "Bluetooth Speaker", "Denim Jacket", "Wrist Watch", "Phone Case",
  "Travel Pouch", "Ceramic Vase", "Table Clock", "Beanie Hat",
  "Gaming Mouse", "Tote Bag", "Scented Candle", "Desk Mat",
];

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: titles.map((title, i) => ({
      title,
      description: `${title} - mock product for testing the UI.`,
      price: 999 + i * 350,
      imgSrc: `https://picsum.photos/seed/product-${i + 1}/400/400`,
    })),
  });

  console.log(`Seeded ${titles.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());