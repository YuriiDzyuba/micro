import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async createPost(createPostDto: CreatePostDto) {
    const newPost = await this.postRepository.createPost(createPostDto);
    return newPost;
  }

  async findAllPosts() {
    const foundedPosts = await this.postRepository.findAllPosts();
    return foundedPosts;
  }

  async findOnePost(postId: string) {
    const foundedPost = await this.postRepository.findOnePost(postId);
    return foundedPost;
  }

  async updatePost(postId: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postRepository.updatePost(
      postId,
      updatePostDto,
    );
    return updatedPost;
  }

  async removePost(postId: string) {
    await this.postRepository.removePost(postId);
  }
}
