import "dotenv/config";
import { prisma } from "../lib/prisma";

const products = [
  { en: "Classic Hoodie", el: "Κλασικό Φούτερ" },
  { en: "Canvas Backpack", el: "Σακίδιο από Καμβά" },
  { en: "Wireless Earbuds", el: "Ασύρματα Ακουστικά" },
  { en: "Desk Lamp", el: "Επιτραπέζιο Φωτιστικό" },
  { en: "Water Bottle", el: "Παγούρι" },
  { en: "Running Shoes", el: "Παπούτσια Τρεξίματος" },
  { en: "Leather Wallet", el: "Δερμάτινο Πορτοφόλι" },
  { en: "Mechanical Keyboard", el: "Μηχανικό Πληκτρολόγιο" },
  { en: "Coffee Mug", el: "Κούπα Καφέ" },
  { en: "Sunglasses", el: "Γυαλιά Ηλίου" },
  { en: "Yoga Mat", el: "Στρώμα Γιόγκα" },
  { en: "Notebook Set", el: "Σετ Σημειωματαρίων" },
  { en: "Bluetooth Speaker", el: "Ηχείο Bluetooth" },
  { en: "Denim Jacket", el: "Τζιν Μπουφάν" },
  { en: "Wrist Watch", el: "Ρολόι Χειρός" },
  { en: "Phone Case", el: "Θήκη Κινητού" },
  { en: "Travel Pouch", el: "Τσαντάκι Ταξιδίου" },
  { en: "Ceramic Vase", el: "Κεραμικό Βάζο" },
  { en: "Table Clock", el: "Επιτραπέζιο Ρολόι" },
  { en: "Beanie Hat", el: "Σκουφάκι" },
  { en: "Gaming Mouse", el: "Gaming Ποντίκι" },
  { en: "Tote Bag", el: "Τσάντα Tote" },
  { en: "Scented Candle", el: "Αρωματικό Κερί" },
  { en: "Desk Mat", el: "Υπόθεμα Γραφείου" },
];

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products.map((p, i) => ({
      title_ml: { el: p.el, en: p.en },
      description_ml: {
        el: `${p.el} - δοκιμαστικό προϊόν για δοκιμή του UI.`,
        en: `${p.en} - mock product for testing the UI.`,
      },
      price: 999 + i * 350,
      imgSrc: `https://picsum.photos/seed/product-${i + 1}/400/400`,
    })),
  });

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());