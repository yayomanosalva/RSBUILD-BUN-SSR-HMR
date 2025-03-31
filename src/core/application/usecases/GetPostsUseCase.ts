import { PostModel } from "@/core/domain/models/PostModel";
import { PostRepository } from "@/core/domain/repositories/PostRepository";

export class GetPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<PostModel[]> {
    return this.postRepository.getPosts();
  }
}
