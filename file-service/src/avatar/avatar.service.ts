import { Injectable } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { Avatar } from "./types/avatar.type";

@Injectable()
export class AvatarService {
  async prepareImage(image: Avatar, imageFilter = ''): Promise<Avatar> {

    switch (imageFilter) {
      case 'sepia':
        return this._sepiaImage(image);
      case 'pink':
        return this._pinkImage(image);
      case 'black':
        return this._blackImage(image);
      case 'multi':
        return this._multiImage(image);
      default:
        return this._resizeImage(image);
    }
  }


  create(createAvatarDto: CreateAvatarDto) {
    return 'This action adds a new avatar';
  }

  findAll() {
    return `This action returns all avatar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avatar`;
  }

  update(id: number, updateAvatarDto: UpdateAvatarDto) {
    return `This action updates a #${id} avatar`;
  }

  remove(id: number) {
    return `This action removes a #${id} avatar`;
  }
}
