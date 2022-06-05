import { PostEntity } from './entities/post.entity';

export class PostMapper {
  mapPostEntityToPost(post: PostEntity) {
    return {};
  }

  mapPostEntitiesToPosts(posts: PostEntity[]) {
    return posts.map((post) => this.mapPostEntityToPost(post));
  }
}
