import { Pool } from "pg"; // Driver Adapter Setup, pg is library for connecting to PostgreSQL databases in Node.js.
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

//Every time you save a file, Next.js re-runs the code. If you just did const prisma = new PrismaClient(), every file save would open a new connection pool to your database. You would quickly hit the "Too many connections" error and crash your database.
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
