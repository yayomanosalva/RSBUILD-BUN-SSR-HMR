import { config } from "@/config";

export function useConfig() {
  const isDevelopment = config.NEXT_PUBLIC_ENV === "development";
  const apiUrl = config.NEXT_PUBLIC_API_URL;

  return {
    isDevelopment,
    apiUrl,
    config,
  };
}
