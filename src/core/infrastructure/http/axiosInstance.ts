import axios from "axios";
import { requestInterceptor } from "./interceptors/requestInterceptor";
import { responseInterceptor, responseErrorInterceptor } from "./interceptors/responseInterceptor";
import { config } from '@/config';

const API_URL = config.NEXT_PUBLIC_API_URL;

// Crear una instancia personalizada de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Configurar interceptores
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Enviando solicitud:', config);
    return requestInterceptor(config);
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Respuesta recibida:', response);
    return responseInterceptor(response);
  },
  (error) => {
    console.error('Error en la respuesta:', error);
    return responseErrorInterceptor(error);
  }
);

export default axiosInstance;