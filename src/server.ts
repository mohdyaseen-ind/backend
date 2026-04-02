import app from './app';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // Attempt database connection
    await prisma.$connect();
    console.log('✅ Connected to database successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
      console.log(`📚 Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server: ', error);
    process.exit(1);
  }
}

if (require.main === module) {
  bootstrap();
}
