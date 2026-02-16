import { SplitType } from '@prisma/client';
import { z } from 'zod';

export const createGroupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  pin: z
    .string()
    .trim()
    .regex(/^\d{4}$/)
    .optional()
    .or(z.literal(''))
});

export const createMemberSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().max(20).optional().or(z.literal(''))
});

export const createBillSchema = z.object({
  title: z.string().trim().max(120).optional().or(z.literal('')),
  total: z.string().min(1),
  splitType: z.nativeEnum(SplitType)
});

export const createSharesSchema = z.object({
  splitType: z.nativeEnum(SplitType),
  allocations: z.array(
    z.object({
      memberId: z.string().min(1),
      value: z.number().nonnegative().optional()
    })
  )
});
