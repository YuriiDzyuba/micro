import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { PostPresenter } from './post.presenter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  createPost,
  findAllPosts,
  findOnePost,
  updatePost,
  removePost,
} from './consts/swagger.consts';

@ApiTags('Post module')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postPresenter: PostPresenter,
  ) {}

  @ApiOperation(createPost.apiOperation)
  @ApiResponse(createPost.apiResponse)
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const newPost = await this.postService.createPost(createPostDto);
    return this.postPresenter.mapPostResponse(newPost);
  }

  @ApiOperation(findAllPosts.apiOperation)
  @ApiResponse(findAllPosts.apiResponse)
  @Get()
  async findAllPosts() {
    const foundedPosts = await this.postService.findAllPosts();
    return this.postPresenter.mapMenuPostResponse(foundedPosts);
  }

  @ApiOperation(findOnePost.apiOperation)
  @ApiResponse(findOnePost.apiResponse)
  @Get(':postId')
  async findOnePost(@Param('postId') postId: string) {
    const foundedPost = await this.postService.findOnePost(postId);
    return this.postPresenter.mapPostResponse(foundedPost);
  }

  @ApiOperation(updatePost.apiOperation)
  @ApiResponse(updatePost.apiResponse)
  @Patch(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const updatedPost = await this.postService.updatePost(
      postId,
      updatePostDto,
    );
    return this.postPresenter.mapPostResponse(updatedPost);
  }

  @ApiOperation(removePost.apiOperation)
  @ApiResponse(removePost.apiResponse)
  @Delete(':postId')
  async removePost(@Param('postId') postId: string) {
    const removedPost = await this.postService.removePost(postId);
    return this.postPresenter.mapPostResponse(removedPost);
  }
}
