import { prisma } from '../server';
import { AppError } from '../middlewares/errorHandler';

export class UserService {
  static async findAll() {
    return await prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, createdAt: true }
    });
  }

  static async updateRole(id: string, role: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('User not found', 404);

    return await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, role: true }
    });
  }

  static async updateStatus(id: string, isActive: boolean) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('User not found', 404);

    return await prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, email: true, isActive: true }
    });
  }
}
