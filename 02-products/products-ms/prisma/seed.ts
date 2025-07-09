import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  const sql = readFileSync(join(__dirname, 'products.sql'), 'utf8');
  await prisma.$executeRawUnsafe(sql);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
