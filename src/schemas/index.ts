import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  })
});

export const updateUserRoleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
  })
});

export const updateUserStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    isActive: z.boolean(),
  })
});

export const createRecordSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(1),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date string' }),
    notes: z.string().optional(),
  })
});

export const updateRecordSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().min(1).optional(),
    date: z.string().refine((date) => !isNaN(Date.parse(date))).optional(),
    notes: z.string().optional(),
  })
});

export const getRecordsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().optional(),
    search: z.string().optional()
  })
});
