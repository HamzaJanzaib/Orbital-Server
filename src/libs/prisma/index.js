import { PrismaClient } from "@prisma/client";
import Env from "../../config/env";

const globalForPrisma = global;
const prisma = new PrismaClient()

if (Env.NODE_ENV != "production") globalForPrisma.prisma = prisma

export default prisma