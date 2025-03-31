import { PostModel } from "@/core/domain/models/PostModel";

export interface PostRepository {
  getPosts(): Promise<PostModel[]>;
  getPostById(id: number): Promise<PostModel | null>;
}
