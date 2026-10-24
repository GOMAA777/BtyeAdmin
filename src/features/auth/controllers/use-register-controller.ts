"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas/register.schema";
import { registerAction } from "../actions/register.action";
import { isUserAuthenticated, setAuthSession } from "@/lib/auth-session";
import { APP_CONFIG } from "@/lib/constants";

const emptySubscribe = () => () => {};

export function useRegisterController() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isAuthenticated = useSyncExternalStore(
    emptySubscribe,
    isUserAuthenticated,
    () => null
  );

  useEffect(() => {
    if (isAuthenticated === true) {
      const prefix = APP_CONFIG.basePath || "";
      window.location.replace(`${prefix}/`);
    }
  }, [isAuthenticated]);

  const isCheckingAuth = isAuthenticated === null;

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const passwordValue = useWatch({ control: form.control, name: "password" });
  const confirmPasswordValue = useWatch({
    control: form.control,
    name: "confirmPassword",
  });
  const passwordsMatch =
    Boolean(passwordValue) &&
    Boolean(confirmPasswordValue) &&
    passwordValue === confirmPasswordValue;

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await registerAction(data);
      if (res?.data?.success) {
        setAuthSession({
          fullName: data.fullName,
          email: data.email,
        });
        setFeedback(res.data.message || "تم إنشاء الحساب بنجاح");
        const prefix = APP_CONFIG.basePath || "";
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(`${prefix}/`);
      }
    } catch {
      setFeedback("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return {
    form,
    showPassword,
    isSubmitting,
    feedback,
    isCheckingAuth,
    passwordsMatch,
    togglePasswordVisibility,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
