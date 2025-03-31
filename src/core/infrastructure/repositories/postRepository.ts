import api from "../http/api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};
