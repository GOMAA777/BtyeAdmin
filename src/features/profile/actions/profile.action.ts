"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import {
  updateProfileSchema,
  updatePermissionsSchema,
  sendOperationalMessageSchema,
} from "../schemas/profile.schema";

export const updateProfileAction = actionClient
  .schema(updateProfileSchema)
  .action(async ({ parsedInput }) => {
    // In production this persists to database/backend API
    revalidatePath("/profile");
    return {
      success: true,
      message: "تم حفظ وتحديث بيانات الملف الشخصي بنجاح",
      data: parsedInput,
    };
  });

export const updatePermissionsAction = actionClient
  .schema(updatePermissionsSchema)
  .action(async ({ parsedInput }) => {
    revalidatePath("/profile");
    return {
      success: true,
      message: "تم تحديث نطاق الصلاحيات والتكليفات بنجاح",
      data: parsedInput,
    };
  });

export const sendOperationalMessageAction = actionClient
  .schema(sendOperationalMessageSchema)
  .action(async ({ parsedInput }) => {
    return {
      success: true,
      message: "تم إرسال الرسالة التشغيلية عبر WhatsApp بنجاح",
      data: parsedInput,
    };
  });
