import { CreatePostDto } from './dto/create.post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostMapper } from './post.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly post: Repository<PostEntity>,
    readonly postMapper: PostMapper,
  ) {}

  async createPost(postToSave: CreatePostDto) {
    const newPost = await this.post.save(postToSave);
    return newPost ? this.postMapper.mapPostEntityToPost(newPost) : null;
  }

  async findAllPosts() {
    const foundedPosts = await this.post.find();
    return foundedPosts
      ? this.postMapper.mapPostEntitiesToPosts(foundedPosts)
      : [];
  }

  async findOnePost(postId: string) {
    const foundedPost = await this.post.findOne({ postId });
    return foundedPost
      ? this.postMapper.mapPostEntityToPost(foundedPost)
      : null;
  }

  async updatePost(postId: string, fieldsToUpdate) {
    const { affected } = await this.post.update(
      { postId },
      {
        ...fieldsToUpdate,
      },
    );
    return !!affected;
  }

  async removePost(postId: string): Promise<boolean> {
    const { affected } = await this.post.delete(postId);
    return !!affected;
  }
}
