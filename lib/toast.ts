import { type ToastProps } from "@/components/ui/toast";

export interface ToastConfig {
  title: string;
  description: string;
  duration?: number;
  variant?: "default" | "destructive";
}

export const TOAST_STYLES = {
  success: {
    duration: 6000,
    className: "bg-green-50 border-green-200 text-green-900",
    variant: "default",
  },
  error: {
    duration: 6000,
    className: "bg-red-50 border-red-200 text-red-900",
    variant: "destructive",
  },
  warning: {
    duration: 5000,
    className: "bg-yellow-50 border-yellow-200 text-yellow-900",
    variant: "default",
  },
  info: {
    duration: 4000,
    className: "bg-blue-50 border-blue-200 text-blue-900",
    variant: "default",
  },
} as const;

export const createToast = (
  type: keyof typeof TOAST_STYLES,
  config: ToastConfig
): ToastProps => ({
  ...TOAST_STYLES[type],
  ...config,
  open: true,
});
