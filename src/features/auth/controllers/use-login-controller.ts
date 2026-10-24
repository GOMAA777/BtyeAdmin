"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/login.schema";
import { loginAction } from "../actions/login.action";
import { isUserAuthenticated, setAuthSession, subscribeAuth } from "@/lib/auth-session";
import { APP_CONFIG } from "@/lib/constants";

export function useLoginController() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isAuthenticated = useSyncExternalStore(
    subscribeAuth,
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

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await loginAction(data);
      if (res?.data?.success) {
        setAuthSession({ identifier: data.identifier }, data.rememberMe);
        setFeedback(res.data.message || "تم تسجيل الدخول بنجاح");
        const prefix = APP_CONFIG.basePath || "";
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign(`${prefix}/`);
      }
    } catch {
      setFeedback("حدث خطأ أثناء تسجيل الدخول");
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
    togglePasswordVisibility,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
