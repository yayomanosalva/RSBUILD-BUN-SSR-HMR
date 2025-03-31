import { GetPostsUseCase } from '@/core/domain/use-cases/GetPostsUseCase';
import { PostRepository } from '@/core/domain/repositories/PostRepository';
import { Post } from '@/core/domain/entities/Post';

export class GetPostsUseCaseImpl implements GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }
}