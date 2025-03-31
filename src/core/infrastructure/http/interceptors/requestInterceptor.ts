import { InternalAxiosRequestConfig, AxiosHeaders } from "axios";

// Interceptor de solicitud
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  console.log('Enviando solicitud:', config);
  return config;
};