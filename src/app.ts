import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const app = fastify();

prisma.user.create({
  data: {
    name: 'Lucas',
    email: 'Lucas@gmail.com',
    
  }
});