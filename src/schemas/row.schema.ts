import { z } from 'zod';

export const rowSchema = z.object({
  rowName: z.string().min(1, 'Обязательное поле'),
  salary: z.coerce.number().min(0, 'Не может быть меньше 0').default(0),
  equipmentCosts: z.coerce.number().min(0, 'Не может быть меньше 0').default(0),
  overheads: z.coerce.number().min(0, 'Не может быть меньше 0').default(0),
  estimatedProfit: z.coerce
    .number()
    .min(0, 'Не может быть меньше 0')
    .default(0),
  parentId: z.coerce.number().nullable().optional(),

  /* Не используются, но нужны для API */
  machineOperatorSalary: z.coerce.number().min(0).default(0),
  mainCosts: z.coerce.number().min(0).default(0),
  materials: z.coerce.number().min(0).default(0),
  mimExploitation: z.coerce.number().min(0).default(0),
  supportCosts: z.coerce.number().min(0).default(0),
});

export type RowFormType = z.infer<typeof rowSchema>;
