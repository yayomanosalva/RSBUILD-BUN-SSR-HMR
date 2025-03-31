import { PostRepositoryImpl } from "@/reposImpl/PostRepositoryImpl";
import { PostRepository } from "@/repos/PostRepository";
import { GetPostsUseCase } from "@/usecases/GetPostsUseCase";

// Instancias concretas
const postRepository: PostRepository = new PostRepositoryImpl();
const getPostsUseCase = new GetPostsUseCase(postRepository);

// Contenedor de dependencias
export const postContainer = {
  getPostsUseCase,
};
