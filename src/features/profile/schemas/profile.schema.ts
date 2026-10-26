import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(3, "الاسم الكامل يجب ألا يقل عن 3 أحرف"),
  name: z.string().min(2, "الاسم المختصر يجب ألا يقل عن حرفين"),
  phone: z.string().min(8, "رقم الجوال غير صحيح"),
  whatsapp: z.string().min(8, "رقم الواتساب غير صحيح"),
  contractType: z.string().min(2, "نوع التعاقد مطلوب"),
  workingHours: z.string().min(3, "ساعات العمل مطلوبة"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updatePermissionsSchema = z.object({
  coverageScope: z.enum(["all", "custom"]),
  propertyIds: z.array(z.string()),
  permissions: z.object({
    cleaning: z.boolean(),
    inspection: z.boolean(),
    maintenance: z.boolean(),
  }),
});

export type UpdatePermissionsInput = z.infer<typeof updatePermissionsSchema>;

export const sendOperationalMessageSchema = z.object({
  messageType: z.string().min(1, "نوع الرسالة مطلوب"),
  customText: z.string().optional(),
});

export type SendOperationalMessageInput = z.infer<typeof sendOperationalMessageSchema>;
