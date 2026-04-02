import { prisma } from '../server';
import { AppError } from '../middlewares/errorHandler';

export class RecordService {
  static async create(data: any, userId: string) {
    return await prisma.record.create({
      data: {
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: new Date(data.date),
        notes: data.notes,
        createdById: userId,
      }
    });
  }

  static async findAll(query: any) {
    const { page = 1, limit = 10, startDate, endDate, type, category, search } = query;
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null }; // Exclude soft deleted
    if (type) where.type = type;
    if (category) where.category = category;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }
    if (search) {
      where.OR = [
        { notes: { contains: search } },
        { category: { contains: search } }
      ];
    }

    const [records, total] = await Promise.all([
      prisma.record.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: { createdBy: { select: { id: true, firstName: true, lastName: true } } }
      }),
      prisma.record.count({ where })
    ]);

    return { records, total, page, totalPages: Math.ceil(total / limit) };
  }

  static async findById(id: string) {
    const record = await prisma.record.findFirst({ where: { id, deletedAt: null } });
    if (!record) throw new AppError('Record not found', 404);
    return record;
  }

  static async update(id: string, data: any) {
    await this.findById(id); // Check existence
    
    const updateData: any = { ...data };
    if (updateData.date) updateData.date = new Date(updateData.date);

    return await prisma.record.update({
      where: { id },
      data: updateData
    });
  }

  static async delete(id: string) {
    await this.findById(id); // Check existence
    // Soft Delete
    await prisma.record.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    return { message: 'Record deleted successfully' };
  }
}
