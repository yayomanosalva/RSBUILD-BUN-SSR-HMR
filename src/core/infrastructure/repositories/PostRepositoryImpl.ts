import axiosInstance from "@/http/axiosInstance";
import { PostModel } from "@/core/domain/models/PostModel";
import { PostRepository } from "@/repos/PostRepository";

export class PostRepositoryImpl implements PostRepository {
  async getPosts(): Promise<PostModel[]> {
    const response = await axiosInstance.get<PostModel[]>("/posts");
    return response.data;
  }

  async getPostById(id: number): Promise<PostModel | null> {
    const response = await axiosInstance.get<PostModel>(`/posts/${id}`);
    return response.data || null;
  }
}
