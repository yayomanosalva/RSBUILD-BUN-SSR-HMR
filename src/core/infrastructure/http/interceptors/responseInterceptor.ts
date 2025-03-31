import { AxiosResponse, AxiosError } from "axios";

const handleErrorResponse: { [key: number]: string; default: string } = {
  401: "No autorizado: Redirigir al login",
  404: "Recurso no encontrado",
  500: "Error interno del servidor",
  default: "Error desconocido",
};

const handleResponseError = (status: number) => {
  const errorMessage =
    handleErrorResponse[status] || handleErrorResponse.default;
  console.error(errorMessage);

  if (status === 401) {
    window.location.href = "/home";
  }
};

export const responseInterceptor = (response: AxiosResponse) => {
  console.log("Respuesta recibida:", response);
  return response;
};

export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    handleResponseError(error.response.status);
  } else if (error.request) {
    console.error("No se recibió respuesta del servidor");
  } else {
    console.error("Error al configurar la solicitud", error.message);
  }

  return Promise.reject(error);
};
