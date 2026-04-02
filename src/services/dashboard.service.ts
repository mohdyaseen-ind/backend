import { prisma } from '../server';

export class DashboardService {
  static async getSummary() {
    const rawRecords = await prisma.record.findMany({
      where: { deletedAt: null },
      select: { amount: true, type: true, category: true, date: true }
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals: Record<string, number> = {};

    rawRecords.forEach((record) => {
      if (record.type === 'INCOME') {
        totalIncome += record.amount;
      } else {
        totalExpenses += record.amount;
      }

      const cat = record.category;
      if (!categoryTotals[cat]) categoryTotals[cat] = 0;
      categoryTotals[cat] += record.amount;
    });

    const netBalance = totalIncome - totalExpenses;

    // Recent activity (last 5)
    const recentActivity = await prisma.record.findMany({
      where: { deletedAt: null },
      take: 5,
      orderBy: { date: 'desc' },
      select: { id: true, amount: true, type: true, category: true, date: true }
    });

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      categoryTotals,
      recentActivity
    };
  }
}
