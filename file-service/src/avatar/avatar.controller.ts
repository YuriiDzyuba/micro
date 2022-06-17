import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AvatarService } from './avatar.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Controller()
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @MessagePattern('createAvatar')
  create(@Payload() createAvatarDto: CreateAvatarDto) {
    return this.avatarService.create(createAvatarDto);
  }

  @MessagePattern('findAllAvatar')
  findAll() {
    return this.avatarService.findAll();
  }

  @MessagePattern('findOneAvatar')
  findOne(@Payload() id: number) {
    return this.avatarService.findOne(id);
  }

  @MessagePattern('updateAvatar')
  update(@Payload() updateAvatarDto: UpdateAvatarDto) {
    return this.avatarService.update(updateAvatarDto.id, updateAvatarDto);
  }

  @MessagePattern('removeAvatar')
  remove(@Payload() id: number) {
    return this.avatarService.remove(id);
  }
}
