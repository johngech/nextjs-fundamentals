import { PrismaClient } from "@/app/generated/prisma/client";
import { envConfig } from "@/config/env-config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const PrismaClientSingleton = () => {
  const { host, port, user, password, dbName } = envConfig.db;
  return new PrismaClient({
    adapter: new PrismaMariaDb({
      host: host,
      port: port,
      user: user,
      password: password,
      database: dbName,
    }),
  });
};

// Accessing the internal Node global type
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof PrismaClientSingleton> | undefined;
};

export const prisma = globalForPrisma.prisma ?? PrismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
