export const ok = <T>(data: T, message?: string) => ({
  success: true as const,
  message,
  data,
});
