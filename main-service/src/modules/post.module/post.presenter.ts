import { Injectable } from '@nestjs/common';

@Injectable()
export class PostPresenter {
  mapPostResponse(post) {
    return { post };
  }

  mapMenuPostResponse(posts) {
    return { posts };
  }
}
