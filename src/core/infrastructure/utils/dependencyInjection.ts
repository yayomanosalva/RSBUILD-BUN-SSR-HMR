import { PostRepository } from '@/repos/PostRepository';
import { PostRepositoryImpl } from '@/reposImpl/PostRepositoryImpl';
import { GetPostsUseCase } from '@/usecases/GetPostsUseCase';

// Instancias concretas
const postRepository: PostRepository = new PostRepositoryImpl();
const getPostsUseCase = new GetPostsUseCase(postRepository);

// Contenedor de dependencias
export const container = {
	getPostsUseCase,
  };